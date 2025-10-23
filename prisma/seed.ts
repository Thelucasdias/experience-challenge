import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');
  const count = await prisma.experience.count();

  if (count === 0) {
    console.log('Nenhuma experiência encontrada, criando seeds...');

    await prisma.experience.createMany({
      data: [
        {
          name: 'Wine Tour',
          description: 'Degustação em vinícolas da Serra Gaúcha',
          price: 200.0,
          location: 'Serra Gaúcha',
          availableSlots: 5,
        },
        {
          name: 'Trilha na Montanha',
          description: 'Trilha ecológica com guia especializado',
          price: 150.0,
          location: 'Parque Nacional do Itatiaia',
          availableSlots: 10,
        },
        {
          name: 'Passeio de Balão',
          description: 'Sobrevoo panorâmico com café da manhã incluso',
          price: 500.0,
          location: 'Boituva - SP',
          availableSlots: 3,
        },
      ],
    });

    console.log('Seeds criadas com sucesso!');
  } else {
    console.log('Experiências já existem, nenhum seed criado.');
  }
}

main()
  .catch((e) => {
    console.error('Erro ao executar seeds:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Seed finalizada.');
  });
