using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PilatesAPI.Entities;

namespace PilatesAPI.Data.Mappings
{
    public class MedidaMap : IEntityTypeConfiguration<Medida>
    {
        public void Configure(EntityTypeBuilder<Medida> builder)
        {
            // Tabela
            builder.ToTable("Medida");

            // Chave Primaria
            builder.HasKey(key => key.Id);
            builder.Property(key => key.Id).ValueGeneratedOnAdd().UseIdentityColumn();

            //Propriedades
            builder.Property(x => x.Altura)
            .IsRequired()
            .HasColumnName("Altura")
            .HasColumnType("DECIMAL");

            builder.Property(x => x.Peso)
            .IsRequired()
            .HasColumnName("Peso")
            .HasColumnType("DECIMAL");

            builder.Property(x => x.Cintura)
            .IsRequired()
            .HasColumnName("Cintura")
            .HasColumnType("DECIMAL");

            builder.Property(x => x.Busto)
            .IsRequired()
            .HasColumnName("Busto")
            .HasColumnType("DECIMAL");

            builder.Property(x => x.Biceps)
            .IsRequired()
            .HasColumnName("Biceps")
            .HasColumnType("DECIMAL");

            builder.Property(x => x.Coxa)
            .IsRequired()
            .HasColumnName("Coxa")
            .HasColumnType("DECIMAL");

            builder.Property(x => x.Panturrilha)
            .IsRequired()
            .HasColumnName("Panturrilha")
            .HasColumnType("DECIMAL");

            builder.Property(x => x.CriadoPor)
              .IsRequired()
              .HasColumnName("CriadoPor")
              .HasColumnType("VARCHAR")
              .HasMaxLength(50);

            builder.Property(x => x.EditadoPor)
               .IsRequired()
               .HasColumnName("EditadoPor")
               .HasColumnType("VARCHAR")
               .HasMaxLength(50);

            builder.Property(x => x.CriadoEm)
               .IsRequired()
               .HasColumnName("CriadoEm")
               .HasColumnType("SMALLDATETIME")
                .HasMaxLength(60)
                .HasDefaultValueSql("GETDATE()");

            builder.Property(x => x.EditadoEm)
               .IsRequired()
               .HasColumnName("EditadoEm")
               .HasColumnType("SMALLDATETIME")
                .HasMaxLength(60)
                .HasDefaultValueSql("GETDATE()");

            // relaçao
            builder.HasOne(x => x.Aluno) // uma medida tem um aluno
            .WithMany(x => x.Medidas) // que tem muitas medidas
            .HasConstraintName("FK_Sessao_Sala")
            .OnDelete(DeleteBehavior.Cascade);



        }
    }
}