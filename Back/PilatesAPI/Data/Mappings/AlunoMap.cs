using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PilatesAPI.Entities;

namespace PilatesAPI.Data.Mappings
{
    public class AlunoMap : IEntityTypeConfiguration<Aluno>
    {
        public void Configure(EntityTypeBuilder<Aluno> builder)
        {
            // Tabela
            builder.ToTable("Aluno");

            // Chave primaria
            builder.HasKey(key => key.Id);
            builder.Property(key => key.Id).ValueGeneratedOnAdd().UseIdentityColumn();

            //Propriedades
            builder.Property(x => x.Nome)
            .IsRequired()
            .HasColumnName("Nome")
            .HasColumnType("VARCHAR")
            .HasMaxLength(50);

            builder.Property(x => x.Telefone)
           .IsRequired()
           .HasColumnName("Telefone")
           .HasColumnType("VARCHAR")
           .HasMaxLength(50);

            builder.Property(x => x.Email)
            .IsRequired()
            .HasColumnName("Email")
            .HasColumnType("VARCHAR")
            .HasMaxLength(50);

            builder.Property(x => x.Endereco)
           .IsRequired()
           .HasColumnName("Endereco")
           .HasColumnType("VARCHAR")
           .HasMaxLength(150);

            builder.Property(x => x.Profissao)
             .IsRequired()
             .HasColumnName("Profissao")
             .HasColumnType("VARCHAR")
             .HasMaxLength(50);

            builder.Property(x => x.Nascimento)
            .IsRequired()
            .HasColumnName("Nascimento")
            .HasColumnType("VARCHAR")
            .HasMaxLength(50);

            builder.Property(x => x.Imagem)
            .IsRequired()
            .HasColumnName("Imagem")
            .HasColumnType("VARCHAR")
            .HasMaxLength(255);

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
        }
    }
}