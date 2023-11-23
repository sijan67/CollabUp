import { faker } from "@faker-js/faker";

// Needed data for post 
export function createRandomUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const name = firstName + " " + lastName;

  return {
    id: faker.string.uuid(),
    photo: faker.image.avatar(),
    name,
    skills: faker.person.bio(),
  };
}

// Needed data for post 
export function createRandomPost() {
  const author = createRandomUser();

  return {
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    author,
    content: faker.lorem.paragraph(),
    image: Math.random() > 0.5 ? faker.image.url() : undefined,
    likesCount: Math.floor(Math.random() * 1000),
    createdAt: faker.date.recent().toISOString(),
  };
}

export function generatePosts() {
  return new Array(50).fill(null).map(() => createRandomPost());
}
