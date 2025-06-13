using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using PracticoFinal.Data;
using PracticoFinal.Models;

namespace PracticoFinal.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TransactionsController : Controller
    {
        private readonly BaseDeDatos _context;

        public TransactionsController(BaseDeDatos context)
        {

            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Transaction>> CreateTransaction(Transaction transaction)
        {
            try
            {
                // Validaciones
                if (transaction.Cantidad == 0)
                    return BadRequest("La cantidad debe ser diferente de 0.");

                if (!double.TryParse(transaction.Cantidad.ToString(), out _))
                    return BadRequest("La cantidad debe ser un número válido.");

                if (!int.TryParse(transaction.MonedaId.ToString(), out _))
                    return BadRequest("El id de la moneda debe ser un número.");

                if (!int.TryParse(transaction.UserId.ToString(), out _))
                    return BadRequest("El id del usuario debe ser un número.");

                var user = await _context.Users.FindAsync(transaction.UserId);
                if (user == null)
                    return BadRequest("El usuario no existe.");


                var transacciones = await _context.Transactions.Include(t => t.User)
                    .Where(t => t.MonedaId == transaction.MonedaId)
                    .ToListAsync();

                var totalDisponible = transacciones.Sum(t => t.Cantidad);

                // validar si hay suficiente crypto
                if (transaction.Cantidad < 0)
                {

                    if (Math.Abs(transaction.Cantidad) > totalDisponible)
                        return BadRequest("No hay suficiente crypto disponible para vender.");
                }

                //  verificar si tiene suficiente saldo
                if (transaction.Cantidad > 0)
                {
                    if (user.Saldo < Math.Abs(transaction.Precio))
                        return BadRequest("El usuario no tiene suficiente dinero para comprar.");
                }


                _context.Transactions.Add(transaction);
                await _context.SaveChangesAsync();

                if (transaction.Cantidad < 0)
                {
                    user.Saldo += Math.Abs(transaction.Precio);
                }
                else
                {
                    user.Saldo -= Math.Abs(transaction.Precio);
                }



                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return Ok(transaction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al procesar la transacción: {ex.Message}");
            }
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetTransactions()
        {
            var transactions = await _context.Transactions
                .Include(t => t.Moneda)
                .Select(t => new
                {
                    t.Id,
                    t.Cantidad,
                    t.UserId,
                    t.Fecha,
                    t.MonedaId,
                    Moneda = new
                    {
                        t.Moneda.Nombre,
                        t.Moneda.Abreviatura
                    }
                })
                .ToListAsync();

            return Ok(transactions);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransactionById(int id)
        {
            try
            {
                var transaction = await _context.Transactions
                 .Include(t => t.Moneda)
                 .Select(t => new
                 {
                     t.Id,
                     t.Cantidad,
                     t.UserId,
                     t.Fecha,
                     t.MonedaId,
                     Moneda = new
                     {
                         t.Moneda.Nombre,
                         t.Moneda.Abreviatura
                     }
                 })
                .FirstOrDefaultAsync(t => t.Id == int.Parse(id.ToString()));

                if (transaction == null) return NotFound("La transacción no existe.");

                return Ok(transaction);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al obtener la transacción: {ex.Message}");
            }
        }
    }
}
