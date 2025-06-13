using System.ComponentModel.DataAnnotations.Schema;

namespace PracticoFinal.Models
{
    public class Transaction
    {
        public int Id { get; set; }

        [Column(TypeName = "decimal(18,8)")]
        public decimal Cantidad { get; set; }

        [Column(TypeName = "decimal(18,8)")]
        public decimal Precio { get; set; }
        public int UserId { get; set; }
        public DateTime Fecha { get; set; }
        public int MonedaId { get; set; } 
        public Moneda? Moneda { get; set; }
        public User? User { get; set; }
    }

}
