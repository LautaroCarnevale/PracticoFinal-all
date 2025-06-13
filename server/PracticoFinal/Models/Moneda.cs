
namespace PracticoFinal.Models
{
    public class Moneda
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Abreviatura { get; set; }
        public List<Transaction> Transacciones { get; set; }
    }
}
