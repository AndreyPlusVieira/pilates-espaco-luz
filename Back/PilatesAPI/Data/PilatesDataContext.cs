using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Flunt.Notifications;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PilatesAPI.Data.Mappings;
using PilatesAPI.Entities;

namespace PilatesAPI.Data
{
    public class PilatesDataContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Medida> Medidas { get; set; }

        public PilatesDataContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Ignore<Notification>();

            builder.ApplyConfiguration(new AlunoMap());
            builder.ApplyConfiguration(new MedidaMap());
        }
    }
}