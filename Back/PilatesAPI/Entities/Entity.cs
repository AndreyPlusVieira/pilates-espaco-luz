using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Flunt.Notifications;

namespace PilatesAPI.Entities
{
    public abstract class Entity : Notifiable<Notification>
    {
        public string CriadoPor { get; set; }
        public DateTime CriadoEm { get; set; } = DateTime.Now;
        public string EditadoPor { get; set; }
        public DateTime EditadoEm { get; set; } = new DateTime();
    }
}