using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using PracticoFinal.Data;
using PracticoFinal.Models;

namespace PracticoFinal.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UsersController : Controller
    {
        private readonly BaseDeDatos _context;

        public UsersController(BaseDeDatos context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (string.IsNullOrWhiteSpace(user.Nombre))
                return BadRequest(new { message = "El nombre es requerido.", type = "error-nombre" });

            if (string.IsNullOrWhiteSpace(user.Apellido))
                return BadRequest(new { message = "El apellido es requerido.", type = "error-apellido" });

            if (string.IsNullOrWhiteSpace(user.Email))
                return BadRequest(new { message = "El correo electrónico es requerido.", type = "error-email" });

            if (user.Email.Contains("@") == false && user.Email.Contains(".") == false)
                return BadRequest(new { message = "El correo electrónico no es válido.", type = "error-email" });

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser != null)
            {
                return Ok(new { message = "El correo electrónico ya está registrado.", type = "error-email", user = existingUser });
            }

            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok(new { type = "success", user });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al crear usuario: " + ex.Message);
                return StatusCode(500, "Error interno del servidor");
            }
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> VerifyUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null) return NotFound("El usuario no existe.");

            return Ok(user);
        }
    }
}
