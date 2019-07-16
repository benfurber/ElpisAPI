import { prisma } from "../src/generated/prisma-client";

async function main() {
  await prisma.createUser({
    email: "may@elpis.app",
    name: "May",
    password: "245089y_qthbisfgu",
    posts: {
      create: {
        title: "Join us for on Elpis",
        content: "https://www.elpis.app/",
        published: true
      }
    }
  });

  await prisma.createUser({
    email: "leia@rebels.com",
    name: "Janet",
    password: "31254gfnfhbiu24@3tt9",
    posts: {
      create: [
        {
          title: "On a peacemaking mission",
          content: "https://starwars.com/",
          published: true,
          comments: {
            create: {
              author: { connect: { email: "may@elpis.app" } },
              content: "How can I help?"
            }
          }
        },
        {
          title: "Death Star",
          content: "https://evilempire.io/"
        }
      ]
    }
  });
}

main().catch(e => console.error(e));
