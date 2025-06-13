using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PracticoFinal.Data;
using PracticoFinal.Models;
using System.Text.Json;

namespace PracticoFinal.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class CryptoController : Controller
    {
        private readonly BaseDeDatos _context;

        public CryptoController(BaseDeDatos context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetCryptos()
        {
            var monedas = await _context.Monedas.Include(x => x.Transacciones).ToListAsync();


            var resultado = new List<object>();

            foreach (var m in monedas)
            {
                var TotalCrypto = m.Transacciones.Sum(y => y.Cantidad);

                resultado.Add(new
                {
                    m.Id,
                    m.Abreviatura,
                    m.Nombre,   
                    TotalCrypto,
                });
            }

            return Ok(
                resultado
            );
        }

        [HttpGet] 
        public async Task<IActionResult> GetMonedas()
        { 
            var monedas = await _context.Monedas.ToListAsync();

            return Ok(monedas);
        }
    }
}
