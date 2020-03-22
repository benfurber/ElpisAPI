import * as bcrypt from "bcryptjs";
import * as moment from "moment";

import { prisma } from "../src/generated/prisma-client";
const {
  createComment,
  createCommunity,
  createPost,
  createReply,
  createUser
} = prisma;

async function main() {
  const password = await bcrypt.hash("1234", 10);

  const may = await createUser({
    email: "eumaynara@gmail.com",
    name: "May Fanucci",
    password,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/edm.jpg"
  });

  const maria = await createUser({
    email: "maria@elpis-not-real.com",
    name: "Maria Luiza Sanchez",
    password,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-1.jpg"
  });

  const rosana = await createUser({
    email: "rosana@elpis-not-real.com",
    name: "Rosana Mello",
    password,
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-2.jpg"
  });

  const userEDM = await createCommunity({
    admins: { connect: { id: may.id } },
    avatarPath:
      "https://elpis-profile-images.s3-sa-east-1.amazonaws.com/uploads/120120-1.jpg",
    name: "Empodere Duas Mulheres"
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
      .subtract(1, "hour")
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
    author: { connect: { id: maria.id } },
    publishedAt: moment(postOneCommentTwo.publishedAt)
      .add(3, "hours")
      .add(17, "minute")
      .format()
  });

  // Two
  await prisma.createPost({
    title: 'O padrão estético e o tal "autocuidado"',
    content:
      "Sobre um sistema que condena mulheres que não estão seguindo as regras do padrão estético",
    imagePath:
      "https://elpis-content-images.s3-sa-east-1.amazonaws.com/uploads/070120-3.jpg",
    publishedAt: moment()
      .subtract(1, "days")
      .format(),
    author,
    published
  });
}

main().catch(e => console.error(e));
