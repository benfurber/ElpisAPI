import * as moment from "moment";

import { prisma } from "../src/generated/prisma-client";
const { createComment, createPost, createReply, createUser } = prisma;

function randomPassword() {
  return `a233-${Math.random()
    .toString(36)
    .substr(2, 5)}`;
}

async function main() {
  const userEDM = await createUser({
    email: "eumaynara@gmail.com",
    name: "Empodere Duas Mulheres",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/edm.jpg"
  });

  const maria = await createUser({
    email: "maria@elpis-not-real.com",
    name: "Maria Luiza Sanchez",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-1.jpg"
  });

  const rosana = await createUser({
    email: "rosana@elpis-not-real.com",
    name: "Rosana Mello",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-2.jpg"
  });

  const rose = await createUser({
    email: "rose@elpis-not-real.com",
    name: "Rose Santos",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-3.jpg"
  });

  const beatriz = await createUser({
    email: "beatriz@elpis-not-real.com",
    name: "Beatriz Belia",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-4.jpg"
  });

  const mariaL = await createUser({
    email: "marial@elpis-not-real.com",
    name: "Maria Leticia Kalil",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-5.jpg"
  });

  const dani = await createUser({
    email: "dani@elpis-not-real.com",
    name: "Dani Dellach",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-6.jpg"
  });

  const victoria = await createUser({
    email: "victoria@elpis-not-real.com",
    name: "Victoria Levy",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-7.jpg"
  });

  const ingrid = await createUser({
    email: "ingrid@elpis-not-real.com",
    name: "Ingrid Salles",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-8.jpg"
  });

  const carol = await createUser({
    email: "carol@elpis-not-real.com",
    name: "Carol Peixoto",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-9.jpg"
  });

  const jessica = await createUser({
    email: "jessica@elpis-not-real.com",
    name: "Jessica Karolina",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-10.jpg"
  });

  const helia = await createUser({
    email: "helia@elpis-not-real.com",
    name: "Helia Leão",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-11.jpg"
  });

  const leia = await createUser({
    email: "leia@elpis-not-real.com",
    name: "Leia Souza",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-12.jpg"
  });

  const taisa = await createUser({
    email: "taisa@elpis-not-real.com",
    name: "Taísa Freitas",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-13.jpg"
  });

  const raquel = await createUser({
    email: "raquel@elpis-not-real.com",
    name: "Raquel Verde",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-14.jpg"
  });

  const nadia = await createUser({
    email: "nadia@elpis-not-real.com",
    name: "Nadia Oliveira",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-15.jpg"
  });

  const lila = await createUser({
    email: "lila@elpis-not-real.com",
    name: "Lila Angélica",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-16.jpg"
  });

  const mariana = await createUser({
    email: "mariana@elpis-not-real.com",
    name: "Mariana Oliveira",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-17.jpg"
  });

  const jacqueline = await createUser({
    email: "jacqueline@elpis-not-real.com",
    name: "Jacqueline Azevedo",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-18.jpg"
  });

  const regiane = await createUser({
    email: "regiane@elpis-not-real.com",
    name: "Regiane Fernandes",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-19.jpg"
  });

  const bruna = await createUser({
    email: "bruna@elpis-not-real.com",
    name: "Bruna Pedrosa",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-20.jpg"
  });

  const pricilla = await createUser({
    email: "pricilla@elpis-not-real.com",
    name: "Pricilla Lopes",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-21.jpg"
  });

  const deborah = await createUser({
    email: "deborah@elpis-not-real.com",
    name: "Deborah Mattos",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-22.jpg"
  });

  const andrade = await createUser({
    email: "andrade@elpis-not-real.com",
    name: "Andrade Fadua",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-23.jpg"
  });

  const leticia = await createUser({
    email: "leticia@elpis-not-real.com",
    name: "Leticia Chagasg",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-24.jpg"
  });

  const luiza = await createUser({
    email: "luiza@elpis-not-real.com",
    name: "Luiza cordeiro",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-25.jpg"
  });

  const camilaf = await createUser({
    email: "camilaf@elpis-not-real.com",
    name: "Camilaf Almeida",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-26.jpg"
  });

  const juliana = await createUser({
    email: "juliana@elpis-not-real.com",
    name: "Juliana Gomes",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-27.jpg"
  });

  const luana = await createUser({
    email: "luana@elpis-not-real.com",
    name: "Luana Caroline",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-28.jpg"
  });

  const author = { connect: { id: userEDM.id } };
  const published = true;

  // One
  const postOne = await createPost({
    title:
      'Quando o conceito de "meninas amadurecem mais rápido" é usado só para favorecer meninos e homens',
    content:
      "Também serve para a sociedade normalizar comportamentos infantis vindo de homens de 35 anos, por exemplo",
    imagePath:
      "https://elpis-content-images.s3-sa-east-1.amazonaws.com/uploads/070120-1.jpg",
    publishedAt: moment()
      .subtract(5, "days")
      .format(),
    author,
    published
  });

  await createComment({
    post: { connect: { id: postOne.id } },
    title: "Não tinha pensado sobre isso antes",
    content: "Caraca é verdade. Eu nunca pensei por esse lado.",
    author: { connect: { id: maria.id } },
    publishedAt: moment(postOne.publishedAt)
      .add(10, "minute")
      .format()
  });

  const postOneCommentTwo = await createComment({
    post: { connect: { id: postOne.id } },
    title: "Minha experiência aos 13 anos",
    content:
      'Eu me lembro que quando tinha 13 anos, um moço estava conversando comigo e disse que eu tinha a "cabeça feita" e que parecia madura para a minha idade, isso há muito tempo atrás. Eu achei legal, porque naquela época eu ainda brincava de casinha e tinha bonecas, além disso, minha mãe me falava que eu era muito criança. Eu adorava ser criança.',
    author: { connect: { id: rosana.id } },
    publishedAt: moment(postOne.publishedAt)
      .add(30, "minute")
      .format()
  });

  await createReply({
    comment: { connect: { id: postOneCommentTwo.id } },
    content: "Ouvi muito isso.",
    author: { connect: { id: rose.id } },
    publishedAt: moment(postOneCommentTwo.publishedAt)
      .add(3, "hours")
      .add(17, "minute")
      .format()
  });

  await createComment({
    post: { connect: { id: postOne.id } },
    title: "E as perguntas descabidas?",
    content:
      "E quando elas são jovens em posições de poder e autoridade perguntam: Com quem ela teve que dormir pra conseguir chegar lá?",
    author: { connect: { id: beatriz.id } },
    publishedAt: moment(postOne.publishedAt)
      .add(7, "hours")
      .format()
  });

  await createComment({
    post: { connect: { id: postOne.id } },
    title: "E as perguntas descabidas?",
    content:
      "E quando elas são jovens em posições de poder e autoridade perguntam: Com quem ela teve que dormir pra conseguir chegar lá?",
    author: { connect: { id: beatriz.id } },
    publishedAt: moment(postOne.publishedAt)
      .add(13, "hours")
      .add(45, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postOne.id } },
    title: "Normalização de casos mais graves",
    content:
      "E assim pedofilia, estupro, violência doméstica e outras ações escrotas masculinas são minimizadas",
    author: { connect: { id: mariaL.id } },
    publishedAt: moment(postOne.publishedAt)
      .add(14, "hours")
      .format()
  });

  // Two
  const postTwo = await createPost({
    title: "Poster VENDENDO TAPA NA CARA",
    content:
      "* +5,5 MILHÕES de crianças brasileiras não tem o nome do pai no registro (Conselho Nacional da Justiça);\n* 56,9% das mães solos estão abaixo da linha da pobreza (Síntese de Indicadores Sociais - IBGE)\n* 11,6 MILHÕES de famílias brasileiras são compostas por mães solos e seus filhos (IBGE)\n* 750 MIL paulistas de 0 a 30 anos não têm o nome do pai no registro (Ministério Público de SP)\n* EM 10 ANOS Brasil ganha mais de 1 milhão de famílias de mães solos (IBGE)\n* 83,8% dos menores de 4 anos são cuidados por mulheres (Pnad).",
    imagePath:
      "https://elpis-content-images.s3-sa-east-1.amazonaws.com/uploads/070120-2.jpg",
    publishedAt: moment()
      .subtract(4, "days")
      .format(),
    author,
    published
  });

  const postTwoCommentOne = await createComment({
    post: { connect: { id: postTwo.id } },
    title: "A história do meu ex-marido",
    content:
      "Meu ex-marido depois de 10 anos casados, filho planejado, com a separação mandou eu me virar com os cuidados. Desapareceu, não aparece em audiência, vamos mandar executar os provisórios com prisão. O cara sumiu. Tem dias que eu nem sei o que fazer.",
    author: { connect: { id: dani.id } },
    publishedAt: moment(postTwo.publishedAt)
      .add(7, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postTwoCommentOne.id } },
    content:
      "Entra com penhora se ele tiver algo no nome, para receber os atrasados. Os 3 últimos meses você executa com pena de prisão. Ainda tem a opção de entrar contra os avós.",
    author: { connect: { id: mariaL.id } },
    publishedAt: moment(postTwoCommentOne.publishedAt)
      .add(1, "hours")
      .format()
  });

  await createReply({
    comment: { connect: { id: postTwoCommentOne.id } },
    content:
      "Aí ainda aparece gente pra falar que mãe solo é porque não escolheu bem o pai da criança. As pessoas fazem tudo pra passar pano pro homem e botar a culpa na conta da mãe.",
    author: { connect: { id: victoria.id } },
    publishedAt: moment(postTwoCommentOne.publishedAt)
      .add(1, "hours")
      .add(22, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postTwoCommentOne.id } },
    content:
      "Nem me mostra essas coisas que a revolta cresce! A vontade de expor em rede social quem é o pai do meu filho só aumenta.",
    author: { connect: { id: ingrid.id } },
    publishedAt: moment(postTwoCommentOne.publishedAt)
      .add(1, "hours")
      .add(23, "minutes")
      .format()
  });

  const postTwoCommentTwo = await createComment({
    post: { connect: { id: postTwo.id } },
    title: "Dar só o nome",
    content:
      "Fora os que dão apenas o nome e não se dão ao trabalho de participar em absolutamente nada! Melhor que nem tivesse dado o nome. Sinceramente!",
    author: { connect: { id: rose.id } },
    publishedAt: moment(postTwo.publishedAt)
      .add(59, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postTwoCommentTwo.id } },
    content:
      'Pior q esse só os que acham que a mãe vive "luxando" com 200 reais. São tantos poréns que nós somos mesmo é guerreiras!',
    author: { connect: { id: carol.id } },
    publishedAt: moment(postTwoCommentTwo.publishedAt)
      .add(56, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postTwoCommentTwo.id } },
    content:
      "Eu não conheço meu pai porém tenho o sobrenome dele, minha mãe sempre me deixou bem clara toda a situação... Eu não sou muito fã de carregar o nome dele, mas é parte da minha história de quem sou, pelo menos sei qm e minha outra metade genética. Minha mãe fez isso mais porque ela achava q eu tinha o direito de saber e decidir depois o que fazer. Mas concordo que algumas leis em relação a isso poderiam ser revistas.",
    author: { connect: { id: beatriz.id } },
    publishedAt: moment(postTwoCommentTwo.publishedAt)
      .add(1, "hour")
      .add(35, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postTwo.id } },
    title: "De cortar o coração",
    content:
      "Ler esse print é de cortar coração. Como um ser humano consegue abandonar/fingir que não existe, outro ser humano.",
    author: { connect: { id: jessica.id } },
    publishedAt: moment(postTwo.publishedAt)
      .add(2, "hours")
      .format()
  });

  await createComment({
    post: { connect: { id: postTwo.id } },
    title: 'Documentário "Falcão"',
    content:
      'Domingo eu assisti o documentário "Falcão", meninos do tráfico. A grande maioria dos adolescentes apresentados no documento não conheciam os seus pais.',
    author: { connect: { id: helia.id } },
    publishedAt: moment(postTwo.publishedAt)
      .add(2, "hours")
      .add(3, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postTwo.id } },
    title: "Consciência masculina?",
    content:
      "Quanto mais eu vivo percebo que não existe consciência masculina.",
    author: { connect: { id: leia.id } },
    publishedAt: moment(postTwo.publishedAt)
      .add(2, "hours")
      .add(50, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postTwo.id } },
    title: "E o aborto?",
    content:
      "E as pessoas preocupadas com aborto da parte de um mulher quando diariamente homens abortam seus filhos.",
    author: { connect: { id: taisa.id } },
    publishedAt: moment(postTwo.publishedAt)
      .add(3, "hours")
      .add(42, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postTwo.id } },
    title: "Pensão alimentícia",
    content:
      "Fora os pais que registram, mas são ausentes e correm da pensão alimentícia.",
    author: { connect: { id: beatriz.id } },
    publishedAt: moment(postTwo.publishedAt)
      .add(4, "hours")
      .format()
  });

  // Three
  const postThree = await prisma.createPost({
    title: 'O padrão estético e o tal "autocuidado"',
    content:
      "Sobre um sistema que condena mulheres que não estão seguindo as regras do padrão estético",
    imagePath:
      "https://elpis-content-images.s3-sa-east-1.amazonaws.com/uploads/070120-3.jpg",
    publishedAt: moment()
      .subtract(3, "days")
      .format(),
    author,
    published
  });

  const postThreeCommentOne = await createComment({
    post: { connect: { id: postThree.id } },
    title: "E o valor gasto com tudo isso?",
    content:
      "Pois é... é o que eu digo para o meu ex... só toma cuidado com quem se preocupa demais com a aparência e de menos com o estado mental... aí eu complemento: cabelo colocado: 1.500 por trimestre, unhas em gel: 200 + 90 por manutenção, peito de silicone 20 mil, balada todo final de semana: 500, roupa de marca 1.000 por mês... estar com uma mulher guerreira que trabalha, paga as contas e que te ama e não precisa de nada disso pra ser incrível não tem preço!",
    author: { connect: { id: leia.id } },
    publishedAt: moment(postThree.publishedAt)
      .add(44, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postThreeCommentOne.id } },
    content:
      "São pontos de vista sobre cuidado... a gente só se ofende com esse tipo de pergunta e ponto de vista porque ainda concorda que essas coisas são uma forma de se cuidar. Eu acho que fazer as unhas é umas das coisas mais fúteis, inúteis, burras de se fazer com o próprio tempo e dinheiro. Maquiagem um pouco também. E que se foda se alguém achar que eu me cuido pouco pq não faço as unhas.",
    author: { connect: { id: maria.id } },
    publishedAt: moment(postThreeCommentOne.publishedAt)
      .add(27, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postThree.id } },
    title: '"Seja mais feminina"',
    content:
      "Tenho ódio quando falam que eu tenho que ser mais feminina. Sou mulher independente se estou toda enfeitada ou se estou descabelada usando moletom velho. O povo não aceita quando a gente está natural",
    author: { connect: { id: mariaL.id } },
    publishedAt: moment(postThree.publishedAt)
      .add(66, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postThree.id } },
    title: "Cuidado e estética",
    content:
      "As pessoas associam cuidado apenas ao aspecto exterior e à plastificidade... Mas na verdade cuidado é muito mais do que algo externo. É nos sentirmos leves e felizes como somos e com os hábitos.",
    author: { connect: { id: beatriz.id } },
    publishedAt: moment(postThree.publishedAt)
      .add(103, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postThree.id } },
    title: "Nunca fui de me arrumar",
    content:
      "Eu nunca fui de me arrumar muito, não sei passar maquiagem, não pinto minhas unhas, meu cabelo quase nunca tá bonito, e não ligo muito pro que eu visto. Sempre fui assim, ninguem nunca me disse nada, mas sei que comentam pela minhas costas. É uma coisa tão chata. Sempre fui taxada em casa como nao sendo feminina o suficiente, por só usar calça e tênis... é tão ridículo!",
    author: { connect: { id: raquel.id } },
    publishedAt: moment(postThree.publishedAt)
      .add(140, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postThree.id } },
    title: "Sigo fazendo o que quero",
    content:
      'Sigo pintando as unhas e usando maquiagem, mas porque isso me diverte, amo as cores os brilhos e possibilidades. Parei de tirar a sobrancelhas pois me recuso a sentir essa dor, as vezes uso sutiã as vezes não. O importante é ser livre para andar "natural" ou "montada ", mas sempre com a consciência do porque estamos fazendo isso.',
    author: { connect: { id: taisa.id } },
    publishedAt: moment(postThree.publishedAt)
      .add(201, "minutes")
      .format()
  });

  // Four
  const postFour = await prisma.createPost({
    title: "Keanu Reeves assume primeira namorada depois de 20 anos",
    content:
      "A depreciação da mulher nos comentários (por outras mulheres) só porque ela não pinta o cabelo. Deixem as mulheres envelhecerem em paz!",
    imagePath:
      "https://elpis-content-images.s3-sa-east-1.amazonaws.com/uploads/070120-4.jpg",
    publishedAt: moment()
      .subtract(2, "days")
      .format(),
    author,
    published
  });

  const postFourCommentOne = await createComment({
    post: { connect: { id: postFour.id } },
    title: "Fico triste lendo isso",
    content:
      "O que me deixa mais triste é que outras mulheres reproduzem o machismo e de forma ainda mais cruel! Mulheres, vamos nos unir mais! Precisamos empoderar outras mulheres, ressaltar a beleza feminina sem padrão de beleza. Todas nós somos belas e merecemos estar onde quisermos e com quem quisermos seja onde for.",
    author: { connect: { id: helia.id } },
    publishedAt: moment(postFour.publishedAt)
      .add(2, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postFourCommentOne.id } },
    content:
      "Parem com os comentários tristes. Eu tenho 37 e tenho o meu cabelo como o dela e nem pinto desde os 18 anos que tenho o cabelo todo branco e to nem aí.",
    author: { connect: { id: leia.id } },
    publishedAt: moment(postFourCommentOne.publishedAt)
      .add(19, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postFourCommentOne.id } },
    content: "Educação baseada em rótulos dá nisso.",
    author: { connect: { id: mariaL.id } },
    publishedAt: moment(postFourCommentOne.publishedAt)
      .add(25, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postFourCommentOne.id } },
    content:
      "Enquanto ela tá feliz cm o Keanu Reeves, as comentaristas tão fazendo promessa pra todos os santos pra saberem Keanu vão arrumar um namorado.",
    author: { connect: { id: ingrid.id } },
    publishedAt: moment(postFourCommentOne.publishedAt)
      .add(26, "minutes")
      .format()
  });

  const postFourCommentTwo = await createComment({
    post: { connect: { id: postFour.id } },
    title: "Absurdo ler comentários assim",
    content:
      "Que vergonha! As pessoas não conseguem notar a felicidade do casal, não se colocam no lugar do ator que viveu décadas solitário e agora está apaixonado novamente. Não, querem fazer comentários idiotas e desnecessários sobre a namorada só porque ela optou por assumir o cabelo branco que talvez algumas das idiotas comentaristas tenham e escondem. Hipocrisia é o mal do século!",
    author: { connect: { id: dani.id } },
    publishedAt: moment(postFour.publishedAt)
      .add(44, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postFourCommentTwo.id } },
    content:
      "Eu vejo uma foto dessas e só me dá vontade de parar de pintar o cabelo! Viva a Terceira Idade!",
    author: { connect: { id: taisa.id } },
    publishedAt: moment(postFourCommentTwo.publishedAt)
      .add(126, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postFour.id } },
    title: "Qual o problema de envelhecer?",
    content:
      "Ela realmente parece ter muito mais, e qual o problema nisso? Todos nós vamos envelhecer, e aparentemente vc pode parecer mais jovem ou mais velho, não vejo problema em envelhecer isso é algo super natural. Quanto aos comentários podem ter sido de má fé, de machismo, de falta de amor ao próximo e etc... Talvez a opção seja só observar e falar menos , pode ser isso que faltou, até porque ninguém tem nada a ver com a vida de ninguém, mas dizer AQUI que ela não parece ser mais velha é hipocrisia.",
    author: { connect: { id: nadia.id } },
    publishedAt: moment(postFour.publishedAt)
      .add(70, "minutes")
      .format()
  });

  const postFourCommntFour = await createComment({
    post: { connect: { id: postFour.id } },
    title: "Empatia, cadê?",
    content:
      "Gente cadê a empatia, porra??? Se coloquem no lugar dela, iriam gostar de ler esse tipo de coisa?",
    author: { connect: { id: lila.id } },
    publishedAt: moment(postFour.publishedAt)
      .add(70, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postFourCommntFour.id } },
    content: "Lamentáveis os comentários.",
    author: { connect: { id: maria.id } },
    publishedAt: moment(postFourCommntFour.publishedAt)
      .add(5, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postFour.id } },
    title: "Ela tem mais de 60 sim",
    content:
      "Cara... mulheres mentem... só basta olhar a pele do colo... tem mais de 60 sim. Mas deixa ela mentir.",
    author: { connect: { id: mariaL.id } },
    publishedAt: moment(postFour.publishedAt)
      .add(72, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postFour.id } },
    title: "Tão felizes?",
    content:
      "O importante é que ele enxerga a alma dela e estão felizes assim né, tudo bom, tudo bem",
    author: { connect: { id: victoria.id } },
    publishedAt: moment(postFour.publishedAt)
      .add(73, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postFour.id } },
    title: "Que saco!",
    content: "Um saco isso! Esquecem que vão envelhecer tbm!",
    author: { connect: { id: rose.id } },
    publishedAt: moment(postFour.publishedAt)
      .add(80, "minutes")
      .format()
  });

  const postFourCommentEight = await createComment({
    post: { connect: { id: postFour.id } },
    title: "Casal lindo",
    content:
      "Sinceramente eu acho ela lindíssima, e olhem pro Keanu, ele tá feliz pra caralho... Acho o cúmulo algumas mulheres que se dizem feministas ofenderem outra mulher.",
    author: { connect: { id: mariana.id } },
    publishedAt: moment(postFour.publishedAt)
      .add(82, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postFourCommentEight.id } },
    content:
      "Eu mega feliz por ele, por eles. Essas pessoas jogando o seu veneno na felicidade alheia, pior ainda, mulheres depreciando outra mulher, lamentável.",
    author: { connect: { id: beatriz.id } },
    publishedAt: moment(postFourCommentEight.publishedAt)
      .add(5, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postFour.id } },
    title: "Assumindo cabelos naturais",
    content:
      "Hoje dia mulheres com 26 anos já pintam o cabelo porque já tem branco, ela apenas gosta de ter os delas naturais, prefere assim do que se esconder por trás do padrão que as próprias mulheres impõe em pintar os cabelos para ficarem mais novas!",
    author: { connect: { id: raquel.id } },
    publishedAt: moment(postFour.publishedAt)
      .add(127, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postFour.id } },
    title: "Mulheres podem namorar homens mais velhos",
    content:
      'Engraçado que nós mulheres podemos namorar com homens mais velhos e é normal, mais nós não podemos ter 5, 10 ou 12 anos na frente deles? Sofrer machismo de "mulheres" nossa raça, é o pior de tudo isso.',
    author: { connect: { id: nadia.id } },
    publishedAt: moment(postFour.publishedAt)
      .add(128, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postFour.id } },
    title: "Não é sobre aparência",
    content:
      "O dia que a humanidade descobrir que não é a aparência e sim a essência. O mundo vai ficar bem mais frequentado. ❤️ Felicidades ao casal.",
    author: { connect: { id: jacqueline.id } },
    publishedAt: moment(postFour.publishedAt)
      .add(130, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postFour.id } },
    title: "Não conhecem ele",
    content:
      "O pior de tudo é que nao conhecem a historia dele, para se acharem no direito de querer optar na relacao dos dois. Triste ver como as pessoas,principalmente mulheres julgando o amor de um casal por causa da aparencia dela.",
    author: { connect: { id: regiane.id } },
    publishedAt: moment(postFour.publishedAt)
      .add(137, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postFour.id } },
    title: "Pra que opinar na vida dos outros?",
    content:
      "Por que o ser humano tem a necessidade de opinar na vida dos outros? Porque é um ser social? Ok. Mas ser social não justifica totalmente isso. Opinar sem que os envolvidos na opinião demonstrem interesse sobre aquilo que o opinador pensa é perder tempo de agir com sabedoria. O silêncio pode dizer muitas coisas úteis, inclusive que vc é sábio, msmo que não seja. É bom pensar antes de falar: o que falar? A quem falar? Por que falar? (Minha opinião é desnecessária tb, eu sei. Falei, porque falo demais)",
    author: { connect: { id: bruna.id } },
    publishedAt: moment(postFour.publishedAt)
      .add(140, "minutes")
      .format()
  });

  // Five
  const postFive = await prisma.createPost({
    title: "Você é mais do que SÓ um corpo",
    content:
      'Lembrando que comer saudável ou não é diferente de comer com culpa. A culpa pode ser aplicada tanto para quem come saudável quanto para o "não-saudável". O foco da postagem é para falar que você é mais do que um corpo e que a sua culpa não ajuda em nada - pelo contrário, te deixa mais infeliz e frustrada consigo mesma.',
    imagePath:
      "https://elpis-content-images.s3-sa-east-1.amazonaws.com/uploads/070120-5.jpg",
    publishedAt: moment()
      .subtract(1, "days")
      .format(),
    author,
    published
  });

  const postFiveCommentOne = await createComment({
    post: { connect: { id: postFive.id } },
    title: "Claro que tem que ter culpa",
    content:
      "Comer com culpa sim! Não existe essa, comam saudável, migas. Mesmo que não seja tão gostoso como comer errado, fará bem pra vocês. Fora isso, concordo com o resto. Obrigada.",
    author: { connect: { id: beatriz.id } },
    publishedAt: moment(postFive.publishedAt)
      .add(140, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postFiveCommentOne.id } },
    content: "Comer saudável ou não é totalmente diferente de comer com culpa.",
    author: { connect: { id: userEDM.id } },
    publishedAt: moment(postFiveCommentOne.publishedAt)
      .add(4, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postFiveCommentOne.id } },
    content:
      "Comer sem culpa é a melhor coisa! O melhor é comer saudável mas se quiser comer errado que não se culpe e entenda as consequencias que vai além de afetar na aparência e sim na saúde!",
    author: { connect: { id: pricilla.id } },
    publishedAt: moment(postFiveCommentOne.publishedAt)
      .add(19, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postFiveCommentOne.id } },
    content: "Comer consciente. Culpa nunca é boa...",
    author: { connect: { id: deborah.id } },
    publishedAt: moment(postFiveCommentOne.publishedAt)
      .add(30, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postFiveCommentOne.id } },
    content:
      'Creio que o ela quer dizer é que ter uma alimentação saudável não é tão fácil assim. Não se pode deixar a disciplina sob o pretexto de "comer sem culpa". Assim como a atividade física. Por mim, só obrigada mesmo, porque por prazer, eu só fico lendo.',
    author: { connect: { id: andrade.id } },
    publishedAt: moment(postFiveCommentOne.publishedAt)
      .add(54, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postFiveCommentOne.id } },
    content:
      "Chegou a magra batendo palma pra uma atitude relacionada a diversos distúrbios alimentares. Parabéns, vcs nunca decepcionam.",
    author: { connect: { id: leticia.id } },
    publishedAt: moment(postFiveCommentOne.publishedAt)
      .add(70, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postFive.id } },
    title: "Exercício físico: não amo",
    content:
      "Às vezes o exercício físico é obrigado mesmo por questão de saúde e não por estética. Mas vamo que vamo!",
    author: { connect: { id: taisa.id } },
    publishedAt: moment(postFive.publishedAt)
      .add(140, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postFive.id } },
    title: "Não dá pra ter os dois",
    content: "Comer saudável com culpa, não é comer saudável!!!",
    author: { connect: { id: mariaL.id } },
    publishedAt: moment(postFive.publishedAt)
      .add(181, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postFive.id } },
    title: "Saudades interpretação",
    content:
      "Tudo vira uma polêmica. Quem sabe um dia a gente aprende ou tenta um pouco de interpretação de texto?",
    author: { connect: { id: jessica.id } },
    publishedAt: moment(postFive.publishedAt)
      .add(182, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postFive.id } },
    title: "Amo trilhas",
    content:
      "Eu amo trilhas. Mas estava sem fôlego. Morrendo pra fazer. Voltei ano passado a fazer atividade física. Fiquei muito mais disposta. E estou mais feliz com o meu corpo. Quanto ao comer, eu ja gosto de coisas saudáveis então não tenho problemas. O que preciso mesmo é parar de me cobrar tanto e confiar mais em mim (já trato minha ansiedade com psicóloga e psiquiatra).",
    author: { connect: { id: leia.id } },
    publishedAt: moment(postFive.publishedAt)
      .add(200, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postFive.id } },
    title: "Exercitar-se por prazer",
    content:
      "Exercícios por prazer... ainda não cheguei ai, é só por obrigação mesmo... imaginando que o resultado que eu quero que e envelhecer em forma e saudável eu vou colher.",
    author: { connect: { id: raquel.id } },
    publishedAt: moment(postFive.publishedAt)
      .add(290, "minutes")
      .format()
  });

  // Six
  const postSix = await prisma.createPost({
    title:
      "Discutindo com homens quando eles tentam te provar que você está errada",
    content: "E aí, lá vou eu explicar que entendi sim, apenas discordo.",
    imagePath:
      "https://elpis-content-images.s3-sa-east-1.amazonaws.com/uploads/070120-6.jpg",
    publishedAt: moment().format(),
    author,
    published
  });

  const postSixCommentOne = await createComment({
    post: { connect: { id: postSix.id } },
    title: "Todas as pessoas autoritárias, né?",
    content:
      "Homem e qualquer pessoa autoritária que nao aceita ser questionada. Insuportável.",
    author: { connect: { id: raquel.id } },
    publishedAt: moment(postSix.publishedAt)
      .add(35, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postSixCommentOne.id } },
    content:
      "Bem isso! Ou ainda dizendo que não temos senso crítico ou opinião própria!",
    author: { connect: { id: luiza.id } },
    publishedAt: moment(postSixCommentOne.publishedAt)
      .add(5, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postSixCommentOne.id } },
    content: "Odeio isso com todas as minhas forças",
    author: { connect: { id: camilaf.id } },
    publishedAt: moment(postSixCommentOne.publishedAt)
      .add(15, "minutes")
      .format()
  });

  const postSixCommentTwo = await createComment({
    post: { connect: { id: postSix.id } },
    title: "Homem não assimila o que você fala",
    content:
      "Homens não assimilam o que você fala, eles assimilam as suas mudanças de atitude.",
    author: { connect: { id: jessica.id } },
    publishedAt: moment(postSix.publishedAt)
      .add(1, "day")
      .format()
  });

  await createReply({
    comment: { connect: { id: postSixCommentTwo.id } },
    content: "MEU DEUS, é MUITO isso. Que ódio!!!",
    author: { connect: { id: beatriz.id } },
    publishedAt: moment(postSixCommentTwo.publishedAt)
      .add(15, "minutes")
      .format()
  });

  const postSixCommentThree = await createComment({
    post: { connect: { id: postSix.id } },
    title: "Tão real!",
    content:
      'Nossa verdade, já conheci macho assim! Eu ainda fazia a besteira de PROVAR que estava certa, e o cara ainda dizia "Você foi pesquisar? Não gosto disso". Ah vá!!',
    author: { connect: { id: taisa.id } },
    publishedAt: moment(postSix.publishedAt)
      .add(60, "minutes")
      .format()
  });

  await createReply({
    comment: { connect: { id: postSixCommentThree.id } },
    content: "Ou dizem que você tá louca.",
    author: { connect: { id: helia.id } },
    publishedAt: moment(postSixCommentThree.publishedAt)
      .add(8, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postSix.id } },
    title: "Mansplanning",
    content: "O mansplanning é um círculo vicioso em cada argumento...",
    author: { connect: { id: dani.id } },
    publishedAt: moment(postSix.publishedAt)
      .add(62, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postSix.id } },
    title: "100% verdade",
    content: "Nossa, a mais pura verdade",
    author: { connect: { id: rosana.id } },
    publishedAt: moment(postSix.publishedAt)
      .add(63, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postSix.id } },
    title: "Uma história de ontem",
    content:
      "E isso serve pra tudo, inclusive com coisas simples do dia a dia. Ontem fui comprar uma pasta de côco, o cara não conhecia, expliquei como era, afinal eu conhecia. Ele: mas você sabia que o óleo de côco no frio também fica branco né? Eu: sim, eu uso óleo de côco e pasta de côco, as duas coisas são bem diferentes. Um é o óleo de côco somente extraído do côco, outra é uma pasta, tipo de amendoim (tive que apelar), de côco é polpa e óleo juntos. Ele olhou com cara de deboche: tem certeza que não é o óleo de côco que estava frio não? Só respondi: nossa, você está muito desesperado pra vender óleo de côco, hein? E sai.",
    author: { connect: { id: lila.id } },
    publishedAt: moment(postSix.publishedAt)
      .add(70, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postSix.id } },
    title: "Quem não está entendendo no final?",
    content:
      'Eu peço pra me explicar de novo, questiono. Aí normalmente o cara já começa a se contradizer e aí eu falo "então, acho que quem não tá entendendo é você!"',
    author: { connect: { id: nadia.id } },
    publishedAt: moment(postSix.publishedAt)
      .add(79, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postSix.id } },
    title: "Exatamente",
    content:
      "Querem explicar o que a gente acabou de dizer. Ou discordam da gente só pra não nos dar razão. Isso acontece comigo todo dia.",
    author: { connect: { id: victoria.id } },
    publishedAt: moment(postSix.publishedAt)
      .add(79, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postSix.id } },
    title: "Mansplanning total",
    content:
      "Aí começa o mansplaining, daí o cara não me dá outra opção senão dá uma aula e mostrar que eu sei do que to falando.",
    author: { connect: { id: carol.id } },
    publishedAt: moment(postSix.publishedAt)
      .add(83, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postSix.id } },
    title: '"PERCA" de tempo',
    content:
      "Dia que o cara me falou que não ia discutir comigo pq era PERCA de tempo. Então eu disse, não PERCA seu tempo, é PERDA de tempo... o bisonho nunca entendeu.",
    author: { connect: { id: helia.id } },
    publishedAt: moment(postSix.publishedAt)
      .add(85, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postSix.id } },
    title: "Meu ex era assim",
    content:
      "Passava sempre por isso com meu ex namorado... enjoei e mandei passear.",
    author: { connect: { id: juliana.id } },
    publishedAt: moment(postSix.publishedAt)
      .add(130, "minutes")
      .format()
  });

  await createComment({
    post: { connect: { id: postSix.id } },
    title: "Pior que é verdade...",
    content:
      'Nossa, pior que é verdade! E quando você insiste em mostrar que ENTENDEU SIM, alguns não reconhecem que você tem opinião própria e discorda da dele! Aí vem com as seguintes frases: "ah mas é diferente", "não é bem assim", "não é por esse lado"... Sempre fazendo você duvidar da própria capacidade intelectual.',
    author: { connect: { id: luana.id } },
    publishedAt: moment(postSix.publishedAt)
      .add(246, "minutes")
      .format()
  });
}

main().catch(e => console.error(e));
