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
        {
          name: 'Mergulho em Arraial do Cabo',
          description: 'Exploração subaquática com instrutor certificado',
          price: 350.0,
          location: 'Arraial do Cabo - RJ',
          availableSlots: 8,
        },
        {
          name: 'Tour Histórico de Ouro Preto',
          description:
            'Passeio guiado pelos principais pontos turísticos e museus',
          price: 120.0,
          location: 'Ouro Preto - MG',
          availableSlots: 15,
        },
        {
          name: 'Expedição Amazônica',
          description: 'Vivência em comunidade ribeirinha e trilhas na selva',
          price: 900.0,
          location: 'Manaus - AM',
          availableSlots: 6,
        },
        {
          name: 'Rota do Café Colonial',
          description: 'Experiência gastronômica completa com pratos típicos',
          price: 180.0,
          location: 'Gramado - RS',
          availableSlots: 12,
        },
        {
          name: 'Aula de Surfe para Iniciantes',
          description: 'Aprenda a surfar com instrutores certificados',
          price: 220.0,
          location: 'Florianópolis - SC',
          availableSlots: 10,
        },
        {
          name: 'Voo de Parapente',
          description: 'Experiência aérea com vista panorâmica da serra',
          price: 400.0,
          location: 'Governador Valadares - MG',
          availableSlots: 4,
        },
        {
          name: 'Passeio de Escuna',
          description: 'Tour marítimo com paradas para banho e snorkeling',
          price: 250.0,
          location: 'Angra dos Reis - RJ',
          availableSlots: 9,
        },
        {
          name: 'Workshop de Fotografia Natural',
          description: 'Curso intensivo em paisagens e luz natural',
          price: 300.0,
          location: 'Chapada Diamantina - BA',
          availableSlots: 7,
        },
      ],
    });

    console.log('Seeds criadas com sucesso!');
  } else {
    console.log(`Banco já possui ${count} experiências, nenhum seed criado.`);
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
