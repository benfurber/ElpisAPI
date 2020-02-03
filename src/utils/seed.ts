require("./dotenv");

import gql from "graphql-tag";
import * as moment from "moment";
import * as fetch from "node-fetch";

const { APP_STORE_TEST_USER_EMAIL, APP_STORE_TEST_USER_PASSWORD } = process.env;

async function apiCall(query, variables = {}, token = null) {
  try {
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    const json = await response.json();
    return json.data ? json.data : console.error(variables, json.errors);
  } catch (error) {
    console.log(error);
  }
}

function randomPassword() {
  return `a233-${Math.random()
    .toString(36)
    .substr(2, 5)}`;
}

async function createUser(variables) {
  const CREATE_USER = gql`
    mutation SignUp(
      $email: String!
      $password: String!
      $name: String!
      $avatarPath: URL
    ) {
      signup(
        email: $email
        password: $password
        name: $name
        avatarPath: $avatarPath
      ) {
        user {
          id
        }
      }
    }
  `;
  await apiCall(CREATE_USER, variables);

  const tokenResponse = await apiCall(LOGIN, {
    email: variables.email,
    password: variables.password
  });

  return tokenResponse.login.token;
}

async function createPost(variables, token) {
  const CREATE_POST = gql`
    mutation CreatePost(
      $title: String
      $content: String!
      $imagePath: URL
      $publishedAt: DateTime
    ) {
      createPost(
        title: $title
        content: $content
        imagePath: $imagePath
        publishedAt: $publishedAt
      ) {
        id
        publishedAt
      }
    }
  `;
  const result = await apiCall(CREATE_POST, variables, token);
  return result.createPost;
}

async function createComment(variables, token) {
  const CREATE_COMMENT = gql`
    mutation CreateComment(
      $content: String!
      $id: ID!
      $title: String
      $publishedAt: DateTime
    ) {
      createComment(
        content: $content
        id: $id
        title: $title
        publishedAt: $publishedAt
      ) {
        id
        publishedAt
      }
    }
  `;
  const result = await apiCall(CREATE_COMMENT, variables, token);
  return result.createComment;
}

async function createReply(variables, token) {
  const CREAT_REPLY = gql`
    mutation CreateReply($content: String!, $id: ID!, $publishedAt: DateTime) {
      createReply(content: $content, id: $id, publishedAt: $publishedAt) {
        id
      }
    }
  `;
  await apiCall(CREAT_REPLY, variables, token);
}

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function time(number, unit, from = undefined) {
  return moment(from)
    .subtract(number, unit)
    .format();
}

async function seed() {
  // Create main user
  const userEDM = await createUser({
    email: "eumaynara@gmail.com",
    name: "Empodere Duas Mulheres",
    password: randomPassword(),
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/edm.jpg",
    token: null
  });

  // Create Apple User for TestFlight
  await createUser({
    email: APP_STORE_TEST_USER_EMAIL,
    name: "Test user",
    password: APP_STORE_TEST_USER_PASSWORD
  });

  // Create Test User
  await createUser({
    email: "new@new.com",
    name: "Test User",
    password: "1234"
  });

  // Create Users for User Testing
  const standardPassword = "1234";

  await createUser({
    email: "bia@bia.com",
    name: "Bia Pennino",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test1.jpg"
  });

  await createUser({
    email: "anahi@anahi.com",
    name: "Anahí Rodrigues Serpa",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test2.jpg"
  });

  await createUser({
    email: "carol@carol.com",
    name: "Carolina Cal Angrisani",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test3.jpg"
  });

  await createUser({
    email: "nati@nati.com",
    name: "Nati Luz",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test4.jpg"
  });

  await createUser({
    email: "esther@esther.com",
    name: "Esther WV",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test5.jpg"
  });

  await createUser({
    email: "sara@sara.com",
    name: "Sara Manoela Ponne",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test6.jpg"
  });

  await createUser({
    email: "ana@ana.com",
    name: "Ana Beatriz Freccia Rosa",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test7.jpg"
  });

  await createUser({
    email: "cris@cris.com",
    name: "Cris Doca",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test8.jpg"
  });

  await createUser({
    email: "mari@mari.com",
    name: "Mariana Hiroki",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test9.jpg"
  });

  await createUser({
    email: "bea@bea.com",
    name: "Bea Santiago",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test10.jpg"
  });

  await createUser({
    email: "renata@renata.com",
    name: "Renata Masini",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test11.jpg"
  });

  await createUser({
    email: "julia@julia.com",
    name: "Julia Bayeux",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test12.jpg"
  });

  await createUser({
    email: "marcela@marcela.com",
    name: "Marcela Bertoni",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test13.jpg"
  });

  await createUser({
    email: "laura@laura.com",
    name: "Laura Carniel",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test14.jpg"
  });

  await createUser({
    email: "mariana@mariana.com",
    name: "Mariana Borba",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test15.jpg"
  });

  await createUser({
    email: "elaine@elaine.com",
    name: "Elaine Diniz Torres",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test16.jpg"
  });

  await createUser({
    email: "talita@talita.com",
    name: "Talita Milena Gavitti Costa",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test17.jpg"
  });

  await createUser({
    email: "ligia@ligia.com",
    name: "Ligia Scalise",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test18.jpg"
  });

  await createUser({
    email: "lais@lais.com",
    name: "Lais Ferreira",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test19.jpg"
  });

  await createUser({
    email: "barbara@barbara.com",
    name: "Barbara Gaiarim",
    password: standardPassword,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/Profile_Test20.jpg"
  });

  // Create Fake Users
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

  // Create Post One
  const postOne = await createPost(
    {
      title:
        'Quando o conceito de "meninas amadurecem mais rápido" é usado só para favorecer meninos e homens',
      content:
        "Também serve para a sociedade normalizar comportamentos infantis vindo de homens de 35 anos, por exemplo",
      imagePath:
        "https://elpis-content-images.s3-sa-east-1.amazonaws.com/uploads/070120-1.jpg",
      publishedAt: time(5, "days")
    },
    userEDM
  );

  await createComment(
    {
      id: postOne.id,
      title: "Não tinha pensado sobre isso antes",
      content: "Caraca é verdade. Eu nunca pensei por esse lado.",
      publishedAt: time(10, "minute")
    },
    maria
  );

  const postOneCommentTwo = await createComment(
    {
      id: postOne.id,
      title: "Minha experiência aos 13 anos",
      content:
        'Eu me lembro que quando tinha 13 anos, um moço estava conversando comigo e disse que eu tinha a "cabeça feita" e que parecia madura para a minha idade, isso há muito tempo atrás. Eu achei legal, porque naquela época eu ainda brincava de casinha e tinha bonecas, além disso, minha mãe me falava que eu era muito criança. Eu adorava ser criança.',
      publishedAt: time(30, "minute", postOne.publishedAt)
    },
    rosana
  );

  await createReply(
    {
      id: postOneCommentTwo.id,
      content: "Ouvi muito isso.",
      publishedAt: time(197, "minute", postOneCommentTwo.publishedAt)
    },
    rose
  );

  await createComment(
    {
      id: postOne.id,
      title: "E as perguntas descabidas?",
      content:
        "E quando elas são jovens em posições de poder e autoridade perguntam: Com quem ela teve que dormir pra conseguir chegar lá?",
      publishedAt: time(7, "hours", postOne.publishedAt)
    },
    beatriz
  );

  await createComment(
    {
      id: postOne.id,
      title: "E as perguntas descabidas?",
      content:
        "E quando elas são jovens em posições de poder e autoridade perguntam: Com quem ela teve que dormir pra conseguir chegar lá?",
      publishedAt: time(13, "hours", postOne.publishedAt)
    },
    beatriz
  );

  await createComment(
    {
      id: postOne.id,
      title: "Normalização de casos mais graves",
      content:
        "E assim pedofilia, estupro, violência doméstica e outras ações escrotas masculinas são minimizadas",
      publishedAt: time(14, "hours", postOne.publishedAt)
    },
    mariaL
  );

  // Create Post Two
  const postTwo = await createPost(
    {
      title: "Poster VENDENDO TAPA NA CARA",
      content:
        "* +5,5 MILHÕES de crianças brasileiras não tem o nome do pai no registro (Conselho Nacional da Justiça);\n* 56,9% das mães solos estão abaixo da linha da pobreza (Síntese de Indicadores Sociais - IBGE)\n* 11,6 MILHÕES de famílias brasileiras são compostas por mães solos e seus filhos (IBGE)\n* 750 MIL paulistas de 0 a 30 anos não têm o nome do pai no registro (Ministério Público de SP)\n* EM 10 ANOS Brasil ganha mais de 1 milhão de famílias de mães solos (IBGE)\n* 83,8% dos menores de 4 anos são cuidados por mulheres (Pnad).",
      imagePath:
        "https://elpis-content-images.s3-sa-east-1.amazonaws.com/uploads/070120-2.jpg",
      publishedAt: time(4, "days")
    },
    userEDM
  );

  const postTwoCommentOne = await createComment(
    {
      id: postTwo.id,
      title: "A história do meu ex-marido",
      content:
        "Meu ex-marido depois de 10 anos casados, filho planejado, com a separação mandou eu me virar com os cuidados. Desapareceu, não aparece em audiência, vamos mandar executar os provisórios com prisão. O cara sumiu. Tem dias que eu nem sei o que fazer.",
      publishedAt: time(7, "minutes", postTwo.publishedAt)
    },
    dani
  );

  await createReply(
    {
      id: postTwoCommentOne.id,
      content:
        "Entra com penhora se ele tiver algo no nome, para receber os atrasados. Os 3 últimos meses você executa com pena de prisão. Ainda tem a opção de entrar contra os avós.",
      publishedAt: time(1, "hour", postTwoCommentOne.publishedAt)
    },
    mariaL
  );

  await createReply(
    {
      id: postTwoCommentOne.id,
      content:
        "Aí ainda aparece gente pra falar que mãe solo é porque não escolheu bem o pai da criança. As pessoas fazem tudo pra passar pano pro homem e botar a culpa na conta da mãe.",
      publishedAt: time(82, "minutes", postTwoCommentOne.publishedAt)
    },
    victoria
  );

  await createReply(
    {
      id: postTwoCommentOne.id,
      content:
        "Nem me mostra essas coisas que a revolta cresce! A vontade de expor em rede social quem é o pai do meu filho só aumenta.",
      publishedAt: time(83, "minutes", postTwoCommentOne.publishedAt)
    },
    ingrid
  );

  const postTwoCommentTwo = await createComment(
    {
      id: postTwo.id,
      title: "Dar só o nome",
      content:
        "Fora os que dão apenas o nome e não se dão ao trabalho de participar em absolutamente nada! Melhor que nem tivesse dado o nome. Sinceramente!",
      publishedAt: time(59, "minutes", postTwo.publishedAt)
    },
    rose
  );

  await createReply(
    {
      id: postTwoCommentTwo.id,
      content:
        'Pior que esse só os que acham que a mãe vive "luxando" com 200 reais. Você já viu a pesquisa que o G1 fez? http://g1.globo.com São tantos poréns que nós somos mesmo é guerreiras!',
      publishedAt: time(56, "minutes", postTwoCommentTwo.publishedAt)
    },
    carol
  );

  await createReply(
    {
      id: postTwoCommentTwo.id,
      content:
        "Eu não conheço meu pai porém tenho o sobrenome dele, minha mãe sempre me deixou bem clara toda a situação... Eu não sou muito fã de carregar o nome dele, mas é parte da minha história de quem sou, pelo menos sei qm e minha outra metade genética. Minha mãe fez isso mais porque ela achava q eu tinha o direito de saber e decidir depois o que fazer. Mas concordo que algumas leis em relação a isso poderiam ser revistas.",
      publishedAt: time(95, "minutes", postTwoCommentTwo.publishedAt)
    },
    beatriz
  );

  await createComment(
    {
      id: postTwo.id,
      title: "De cortar o coração",
      content:
        "Ler esse print é de cortar coração. Como um ser humano consegue abandonar/fingir que não existe, outro ser humano.",
      publishedAt: time(2, "hours", postTwo.publishedAt)
    },
    jessica
  );

  await createComment(
    {
      id: postTwo.id,
      title: 'Documentário "Falcão"',
      content:
        'Domingo eu assisti o documentário "Falcão", meninos do tráfico. A grande maioria dos adolescentes apresentados no documento não conheciam os seus pais.',
      publishedAt: time(123, "minutes", postTwo.publishedAt)
    },
    helia
  );

  await createComment(
    {
      id: postTwo.id,
      title: "Consciência masculina?",
      content:
        "Quanto mais eu vivo percebo que não existe consciência masculina.",
      publishedAt: time(172, "minutes", postTwo.publishedAt)
    },
    leia
  );

  await createComment(
    {
      id: postTwo.id,
      title: "E o aborto?",
      content:
        "E as pessoas preocupadas com aborto da parte de um mulher quando diariamente homens abortam seus filhos.",
      publishedAt: time(224, "minutes", postTwo.publishedAt)
    },
    taisa
  );

  await createComment(
    {
      id: postTwo.id,
      title: "Pensão alimentícia",
      content:
        "Fora os pais que registram, mas são ausentes e correm da pensão alimentícia.",
      publishedAt: time(4, "hours", postTwo.publishedAt)
    },
    beatriz
  );

  // Create Post Three
  const postThree = await createPost(
    {
      title: 'O padrão estético e o tal "autocuidado"',
      content:
        "Sobre um sistema que condena mulheres que não estão seguindo as regras do padrão estético",
      imagePath:
        "https://elpis-content-images.s3-sa-east-1.amazonaws.com/uploads/070120-3.jpg",
      publishedAt: time(3, "days")
    },
    userEDM
  );

  const postThreeCommentOne = await createComment(
    {
      id: postThree.id,
      title: "E o valor gasto com tudo isso?",
      content:
        "Pois é... é o que eu digo para o meu ex... só toma cuidado com quem se preocupa demais com a aparência e de menos com o estado mental... aí eu complemento: cabelo colocado: 1.500 por trimestre, unhas em gel: 200 + 90 por manutenção, peito de silicone 20 mil, balada todo final de semana: 500, roupa de marca 1.000 por mês... estar com uma mulher guerreira que trabalha, paga as contas e que te ama e não precisa de nada disso pra ser incrível não tem preço!",
      publishedAt: time(44, "minutes", postThree.publishedAt)
    },
    leia
  );

  await createReply(
    {
      id: postThreeCommentOne.id,
      content:
        "São pontos de vista sobre cuidado... a gente só se ofende com esse tipo de pergunta e ponto de vista porque ainda concorda que essas coisas são uma forma de se cuidar. Eu acho que fazer as unhas é umas das coisas mais fúteis, inúteis, burras de se fazer com o próprio tempo e dinheiro. Maquiagem um pouco também. E que se foda se alguém achar que eu me cuido pouco pq não faço as unhas.",
      publishedAt: time(27, "minutes", postThreeCommentOne.publishedAt)
    },
    maria
  );

  await createComment(
    {
      id: postThree.id,
      title: '"Seja mais feminina"',
      content:
        "Tenho ódio quando falam que eu tenho que ser mais feminina. Sou mulher independente se estou toda enfeitada ou se estou descabelada usando moletom velho. O povo não aceita quando a gente está natural",
      publishedAt: time(66, "minutes", postThree.publishedAt)
    },
    mariaL
  );

  await createComment(
    {
      id: postThree.id,
      title: "Cuidado e estética",
      content:
        "As pessoas associam cuidado apenas ao aspecto exterior e à plastificidade... Mas na verdade cuidado é muito mais do que algo externo. É nos sentirmos leves e felizes como somos e com os hábitos.",
      publishedAt: time(103, "minutes", postThree.publishedAt)
    },
    beatriz
  );

  await createComment(
    {
      id: postThree.id,
      title: "Nunca fui de me arrumar",
      content:
        "Eu nunca fui de me arrumar muito, não sei passar maquiagem, não pinto minhas unhas, meu cabelo quase nunca tá bonito, e não ligo muito pro que eu visto. Sempre fui assim, ninguem nunca me disse nada, mas sei que comentam pela minhas costas. É uma coisa tão chata. Sempre fui taxada em casa como nao sendo feminina o suficiente, por só usar calça e tênis... é tão ridículo!",
      publishedAt: time(140, "minutes", postThree.publishedAt)
    },
    raquel
  );

  await createComment(
    {
      id: postThree.id,
      title: "Sigo fazendo o que quero",
      content:
        'Sigo pintando as unhas e usando maquiagem, mas porque isso me diverte, amo as cores os brilhos e possibilidades. Parei de tirar a sobrancelhas pois me recuso a sentir essa dor, as vezes uso sutiã as vezes não. O importante é ser livre para andar "natural" ou "montada ", mas sempre com a consciência do porque estamos fazendo isso.',
      publishedAt: time(201, "minutes", postThree.publishedAt)
    },
    taisa
  );

  // Create Post Four
  const postFour = await createPost(
    {
      title: "Keanu Reeves assume primeira namorada depois de 20 anos",
      content:
        "A depreciação da mulher nos comentários (por outras mulheres) só porque ela não pinta o cabelo. Deixem as mulheres envelhecerem em paz!",
      imagePath:
        "https://elpis-content-images.s3-sa-east-1.amazonaws.com/uploads/070120-4.jpg",
      publishedAt: time(2, "days")
    },
    userEDM
  );

  const postFourCommentOne = await createComment(
    {
      id: postFour.id,
      title: "Fico triste lendo isso",
      content:
        "O que me deixa mais triste é que outras mulheres reproduzem o machismo e de forma ainda mais cruel! Mulheres, vamos nos unir mais! Precisamos empoderar outras mulheres, ressaltar a beleza feminina sem padrão de beleza. Todas nós somos belas e merecemos estar onde quisermos e com quem quisermos seja onde for.",
      publishedAt: time(2, "minutes", postFour.publishedAt)
    },
    helia
  );

  await createReply(
    {
      id: postFourCommentOne.id,
      content:
        "Parem com os comentários tristes. Eu tenho 37 e tenho o meu cabelo como o dela e nem pinto desde os 18 anos que tenho o cabelo todo branco e to nem aí.",
      publishedAt: time(19, "minutes", postFourCommentOne.publishedAt)
    },
    leia
  );

  await createReply(
    {
      id: postFourCommentOne.id,
      content: "Educação baseada em rótulos dá nisso.",
      publishedAt: time(25, "minutes", postFourCommentOne.publishedAt)
    },
    mariaL
  );

  await createReply(
    {
      id: postFourCommentOne.id,
      content:
        "Enquanto ela tá feliz cm o Keanu Reeves, as comentaristas tão fazendo promessa pra todos os santos pra saberem Keanu vão arrumar um namorado.",
      publishedAt: time(26, "minutes", postFourCommentOne.publishedAt)
    },
    ingrid
  );

  const postFourCommentTwo = await createComment(
    {
      id: postFour.id,
      title: "Absurdo ler comentários assim",
      content:
        "Que vergonha! As pessoas não conseguem notar a felicidade do casal, não se colocam no lugar do ator que viveu décadas solitário e agora está apaixonado novamente. Não, querem fazer comentários idiotas e desnecessários sobre a namorada só porque ela optou por assumir o cabelo branco que talvez algumas das idiotas comentaristas tenham e escondem. Hipocrisia é o mal do século!",
      publishedAt: time(44, "minutes", postFour.publishedAt)
    },
    dani
  );

  await createReply(
    {
      id: postFourCommentTwo.id,
      content:
        "Eu vejo uma foto dessas e só me dá vontade de parar de pintar o cabelo! Viva a Terceira Idade!",
      publishedAt: time(126, "minutes", postFourCommentTwo.publishedAt)
    },
    taisa
  );

  await createComment(
    {
      id: postFour.id,
      title: "Qual o problema de envelhecer?",
      content:
        "Ela realmente parece ter muito mais, e qual o problema nisso? Todos nós vamos envelhecer, e aparentemente vc pode parecer mais jovem ou mais velho, não vejo problema em envelhecer isso é algo super natural. Quanto aos comentários podem ter sido de má fé, de machismo, de falta de amor ao próximo e etc... Talvez a opção seja só observar e falar menos , pode ser isso que faltou, até porque ninguém tem nada a ver com a vida de ninguém, mas dizer AQUI que ela não parece ser mais velha é hipocrisia.",
      publishedAt: time(70, "minutes", postFour.publishedAt)
    },
    nadia
  );

  const postFourCommntFour = await createComment(
    {
      id: postFour.id,
      title: "Empatia, cadê?",
      content:
        "Gente cadê a empatia, porra??? Se coloquem no lugar dela, iriam gostar de ler esse tipo de coisa?",
      publishedAt: time(70, "minutes", postFour.publishedAt)
    },
    lila
  );

  await createReply(
    {
      id: postFourCommntFour.id,
      content: "Lamentáveis os comentários.",
      publishedAt: time(5, "minutes", postFourCommntFour.publishedAt)
    },
    maria
  );

  await createComment(
    {
      id: postFour.id,
      title: "Ela tem mais de 60 sim",
      content:
        "Cara... mulheres mentem... só basta olhar a pele do colo... tem mais de 60 sim. Mas deixa ela mentir.",
      publishedAt: time(72, "minutes", postFour.publishedAt)
    },
    mariaL
  );

  await createComment(
    {
      id: postFour.id,
      title: "Tão felizes?",
      content:
        "O importante é que ele enxerga a alma dela e estão felizes assim né, tudo bom, tudo bem",
      publishedAt: time(73, "minutes", postFour.publishedAt)
    },
    victoria
  );

  await createComment(
    {
      id: postFour.id,
      title: "Que saco!",
      content: "Um saco isso! Esquecem que vão envelhecer tbm!",
      publishedAt: time(80, "minutes", postFour.publishedAt)
    },
    rose
  );

  const postFourCommentEight = await createComment(
    {
      id: postFour.id,
      title: "Casal lindo",
      content:
        "Sinceramente eu acho ela lindíssima, e olhem pro Keanu, ele tá feliz pra caralho... Acho o cúmulo algumas mulheres que se dizem feministas ofenderem outra mulher.",
      publishedAt: time(82, "minutes", postFour.publishedAt)
    },
    mariana
  );

  await createReply(
    {
      id: postFourCommentEight.id,
      content:
        "Eu mega feliz por ele, por eles. Essas pessoas jogando o seu veneno na felicidade alheia, pior ainda, mulheres depreciando outra mulher, lamentável.",
      publishedAt: time(5, "minutes", postFourCommentEight.publishedAt)
    },
    beatriz
  );

  await createComment(
    {
      id: postFour.id,
      title: "Assumindo cabelos naturais",
      content:
        "Hoje dia mulheres com 26 anos já pintam o cabelo porque já tem branco, ela apenas gosta de ter os delas naturais, prefere assim do que se esconder por trás do padrão que as próprias mulheres impõe em pintar os cabelos para ficarem mais novas!",
      publishedAt: time(127, "minutes", postFour.publishedAt)
    },
    raquel
  );

  await createComment(
    {
      id: postFour.id,
      title: "Mulheres podem namorar homens mais velhos",
      content:
        'Engraçado que nós mulheres podemos namorar com homens mais velhos e é normal, mais nós não podemos ter 5, 10 ou 12 anos na frente deles? Sofrer machismo de "mulheres" nossa raça, é o pior de tudo isso.',
      publishedAt: time(128, "minutes", postFour.publishedAt)
    },
    nadia
  );

  await createComment(
    {
      id: postFour.id,
      title: "Não é sobre aparência",
      content:
        "O dia que a humanidade descobrir que não é a aparência e sim a essência. O mundo vai ficar bem mais frequentado. ❤️ Felicidades ao casal.",
      publishedAt: time(130, "minutes", postFour.publishedAt)
    },
    jacqueline
  );

  await createComment(
    {
      id: postFour.id,
      title: "Não conhecem ele",
      content:
        "O pior de tudo é que nao conhecem a historia dele, para se acharem no direito de querer optar na relacao dos dois. Triste ver como as pessoas,principalmente mulheres julgando o amor de um casal por causa da aparencia dela.",
      publishedAt: time(137, "minutes", postFour.publishedAt)
    },
    regiane
  );

  await createComment(
    {
      id: postFour.id,
      title: "Pra que opinar na vida dos outros?",
      content:
        "Por que o ser humano tem a necessidade de opinar na vida dos outros? Porque é um ser social? Ok. Mas ser social não justifica totalmente isso. Opinar sem que os envolvidos na opinião demonstrem interesse sobre aquilo que o opinador pensa é perder tempo de agir com sabedoria. O silêncio pode dizer muitas coisas úteis, inclusive que vc é sábio, msmo que não seja. É bom pensar antes de falar: o que falar? A quem falar? Por que falar? (Minha opinião é desnecessária tb, eu sei. Falei, porque falo demais)",
      publishedAt: time(140, "minutes", postFour.publishedAt)
    },
    bruna
  );

  // Create Post Five
  const postFive = await createPost(
    {
      title: "Você é mais do que SÓ um corpo",
      content:
        'Lembrando que comer saudável ou não é diferente de comer com culpa. A culpa pode ser aplicada tanto para quem come saudável quanto para o "não-saudável". O foco da postagem é para falar que você é mais do que um corpo e que a sua culpa não ajuda em nada - pelo contrário, te deixa mais infeliz e frustrada consigo mesma.',
      imagePath:
        "https://elpis-content-images.s3-sa-east-1.amazonaws.com/uploads/070120-5.jpg",
      publishedAt: time(1, "days")
    },
    userEDM
  );

  const postFiveCommentOne = await createComment(
    {
      id: postFive.id,
      title: "Claro que tem que ter culpa",
      content:
        "Comer com culpa sim! Não existe essa, comam saudável, migas. Mesmo que não seja tão gostoso como comer errado, fará bem pra vocês. Fora isso, concordo com o resto. Obrigada.",
      publishedAt: time(140, "minutes", postFive.publishedAt)
    },
    beatriz
  );

  await createReply(
    {
      id: postFiveCommentOne.id,
      content:
        "Comer saudável ou não é totalmente diferente de comer com culpa.",
      publishedAt: time(4, "minutes", postFiveCommentOne.publishedAt)
    },
    userEDM
  );

  await createReply(
    {
      id: postFiveCommentOne.id,
      content:
        "Comer sem culpa é a melhor coisa! O melhor é comer saudável mas se quiser comer errado que não se culpe e entenda as consequencias que vai além de afetar na aparência e sim na saúde!",
      publishedAt: time(19, "minutes", postFiveCommentOne.publishedAt)
    },
    pricilla
  );

  await createReply(
    {
      id: postFiveCommentOne.id,
      content: "Comer consciente. Culpa nunca é boa...",
      publishedAt: time(30, "minutes", postFiveCommentOne.publishedAt)
    },
    deborah
  );

  await createReply(
    {
      id: postFiveCommentOne.id,
      content:
        'Creio que o ela quer dizer é que ter uma alimentação saudável não é tão fácil assim. Não se pode deixar a disciplina sob o pretexto de "comer sem culpa". Assim como a atividade física. Por mim, só obrigada mesmo, porque por prazer, eu só fico lendo.',
      publishedAt: time(54, "minutes", postFiveCommentOne.publishedAt)
    },
    andrade
  );

  await createReply(
    {
      id: postFiveCommentOne.id,
      content:
        "Chegou a magra batendo palma pra uma atitude relacionada a diversos distúrbios alimentares. Parabéns, vcs nunca decepcionam.",
      publishedAt: time(70, "minutes", postFiveCommentOne.publishedAt)
    },
    leticia
  );

  await createComment(
    {
      id: postFive.id,
      title: "Exercício físico: não amo",
      content:
        "Às vezes o exercício físico é obrigado mesmo por questão de saúde e não por estética. Mas vamo que vamo!",
      publishedAt: time(140, "minutes", postFive.publishedAt)
    },
    taisa
  );

  await createComment(
    {
      id: postFive.id,
      title: "Não dá pra ter os dois",
      content: "Comer saudável com culpa, não é comer saudável!!!",
      publishedAt: time(181, "minutes", postFive.publishedAt)
    },
    mariaL
  );

  await createComment(
    {
      id: postFive.id,
      title: "Saudades interpretação",
      content:
        "Tudo vira uma polêmica. Quem sabe um dia a gente aprende ou tenta um pouco de interpretação de texto?",
      publishedAt: time(182, "minutes", postFive.publishedAt)
    },
    jessica
  );

  await createComment(
    {
      id: postFive.id,
      title: "Amo trilhas",
      content:
        "Eu amo trilhas. Mas estava sem fôlego. Morrendo pra fazer. Voltei ano passado a fazer atividade física. Fiquei muito mais disposta. E estou mais feliz com o meu corpo. Quanto ao comer, eu ja gosto de coisas saudáveis então não tenho problemas. O que preciso mesmo é parar de me cobrar tanto e confiar mais em mim (já trato minha ansiedade com psicóloga e psiquiatra).",
      publishedAt: time(200, "minutes", postFive.publishedAt)
    },
    leia
  );

  await createComment(
    {
      id: postFive.id,
      title: "Exercitar-se por prazer",
      content:
        "Exercícios por prazer... ainda não cheguei ai, é só por obrigação mesmo... imaginando que o resultado que eu quero que e envelhecer em forma e saudável eu vou colher.",
      publishedAt: time(290, "minutes", postFive.publishedAt)
    },
    raquel
  );

  // Create Post Six
  const postSix = await createPost(
    {
      title:
        "Discutindo com homens quando eles tentam te provar que você está errada",
      content: "E aí, lá vou eu explicar que entendi sim, apenas discordo.",
      imagePath:
        "https://elpis-content-images.s3-sa-east-1.amazonaws.com/uploads/070120-6.jpg",
      publishedAt: time(1, "minute")
    },
    userEDM
  );

  const postSixCommentOne = await createComment(
    {
      id: postSix.id,
      title: "Todas as pessoas autoritárias, né?",
      content:
        "Homem e qualquer pessoa autoritária que nao aceita ser questionada. Insuportável.",
      publishedAt: time(35, "minutes", postSix.publishedAt)
    },
    raquel
  );

  await createReply(
    {
      id: postSixCommentOne.id,
      content:
        "Bem isso! Ou ainda dizendo que não temos senso crítico ou opinião própria!",
      publishedAt: time(5, "minutes", postSixCommentOne.publishedAt)
    },
    luiza
  );

  await createReply(
    {
      id: postSixCommentOne.id,
      content: "Odeio isso com todas as minhas forças",
      publishedAt: time(15, "minutes", postSixCommentOne.publishedAt)
    },
    camilaf
  );

  const postSixCommentTwo = await createComment(
    {
      id: postSix.id,
      title: "Homem não assimila o que você fala",
      content:
        "Homens não assimilam o que você fala, eles assimilam as suas mudanças de atitude.",
      publishedAt: time(1, "day", postSix.publishedAt)
    },
    jessica
  );

  await createReply(
    {
      id: postSixCommentTwo.id,
      content: "MEU DEUS, é MUITO isso. Que ódio!!!",
      publishedAt: time(15, "minutes", postSixCommentTwo.publishedAt)
    },
    beatriz
  );

  const postSixCommentThree = await createComment(
    {
      id: postSix.id,
      title: "Tão real!",
      content:
        'Nossa verdade, já conheci macho assim! Eu ainda fazia a besteira de PROVAR que estava certa, e o cara ainda dizia "Você foi pesquisar? Não gosto disso". Ah vá!!',
      publishedAt: time(60, "minutes", postSix.publishedAt)
    },
    taisa
  );

  await createReply(
    {
      id: postSixCommentThree.id,
      content: "Ou dizem que você tá louca.",
      publishedAt: time(8, "minutes", postSixCommentThree.publishedAt)
    },
    helia
  );

  await createComment(
    {
      id: postSix.id,
      title: "Mansplanning",
      content: "O mansplanning é um círculo vicioso em cada argumento...",
      publishedAt: time(62, "minutes", postSix.publishedAt)
    },
    dani
  );

  await createComment(
    {
      id: postSix.id,
      title: "100% verdade",
      content: "Nossa, a mais pura verdade",
      publishedAt: time(63, "minutes", postSix.publishedAt)
    },
    rosana
  );

  await createComment(
    {
      id: postSix.id,
      title: "Uma história de ontem",
      content:
        "E isso serve pra tudo, inclusive com coisas simples do dia a dia. Ontem fui comprar uma pasta de côco, o cara não conhecia, expliquei como era, afinal eu conhecia. Ele: mas você sabia que o óleo de côco no frio também fica branco né? Eu: sim, eu uso óleo de côco e pasta de côco, as duas coisas são bem diferentes. Um é o óleo de côco somente extraído do côco, outra é uma pasta, tipo de amendoim (tive que apelar), de côco é polpa e óleo juntos. Ele olhou com cara de deboche: tem certeza que não é o óleo de côco que estava frio não? Só respondi: nossa, você está muito desesperado pra vender óleo de côco, hein? E sai.",
      publishedAt: time(70, "minutes", postSix.publishedAt)
    },
    lila
  );

  await createComment(
    {
      id: postSix.id,
      title: "Quem não está entendendo no final?",
      content:
        'Eu peço pra me explicar de novo, questiono. Aí normalmente o cara já começa a se contradizer e aí eu falo "então, acho que quem não tá entendendo é você!"',
      publishedAt: time(79, "minutes", postSix.publishedAt)
    },
    nadia
  );

  await createComment(
    {
      id: postSix.id,
      title: "Exatamente",
      content:
        "Querem explicar o que a gente acabou de dizer. Ou discordam da gente só pra não nos dar razão. Isso acontece comigo todo dia.",
      publishedAt: time(79, "minutes", postSix.publishedAt)
    },
    victoria
  );

  await createComment(
    {
      id: postSix.id,
      title: "Mansplanning total",
      content:
        "Aí começa o mansplaining, daí o cara não me dá outra opção senão dá uma aula e mostrar que eu sei do que to falando.",
      publishedAt: time(83, "minutes", postSix.publishedAt)
    },
    carol
  );

  await createComment(
    {
      id: postSix.id,
      title: '"PERCA" de tempo',
      content:
        "Dia que o cara me falou que não ia discutir comigo pq era PERCA de tempo. Então eu disse, não PERCA seu tempo, é PERDA de tempo... o bisonho nunca entendeu.",
      publishedAt: time(85, "minutes", postSix.publishedAt)
    },
    helia
  );

  await createComment(
    {
      id: postSix.id,
      title: "Meu ex era assim",
      content:
        "Passava sempre por isso com meu ex namorado... enjoei e mandei passear.",
      publishedAt: time(130, "minutes", postSix.publishedAt)
    },
    juliana
  );

  await createComment(
    {
      id: postSix.id,
      title: "Pior que é verdade...",
      content:
        'Nossa, pior que é verdade! E quando você insiste em mostrar que ENTENDEU SIM, alguns não reconhecem que você tem opinião própria e discorda da dele! Aí vem com as seguintes frases: "ah mas é diferente", "não é bem assim", "não é por esse lado"... Sempre fazendo você duvidar da própria capacidade intelectual.',
      publishedAt: time(246, "minutes", postSix.publishedAt)
    },
    luana
  );
}

seed();
