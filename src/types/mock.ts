import { faker } from "@faker-js/faker";

import { User, History } from "./table";

export function createMockHistory(): History {
    return {
        description: faker.lorem.paragraph(),
        date: faker.date.past(),
    };
}

export function createMockUser(): User {
    return {
        id: faker.number.int(),
        name: faker.person.fullName(),
        sex: faker.person.sexType(),
        ethnicity: faker.person.jobArea(),
        age: faker.number.int({ min: 18, max: 60 }),
        birth: faker.date.past(),
        country: faker.location.country(),
        job: faker.person.jobTitle(),
        maritalStatus: faker.string.uuid(),
        nativePlace: faker.location.city(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        contact: faker.person.fullName(),
        relation: faker.string.uuid(),
        contactPhone: faker.phone.number(),
        avatar: faker.image.avatar(),
        pastHistory: [createMockHistory(), createMockHistory()],
        surgeryHistory: [createMockHistory(), createMockHistory()],
        allergicHistory: [createMockHistory()],
        vaccinationHistory: [createMockHistory()],
        importantDrugHistory: [createMockHistory()],
        bloodTransfusionHistory: [createMockHistory()],
        smokingHistory: [createMockHistory()],
        drinkingHistory: [createMockHistory()],
        menstrualHistory: [createMockHistory()],
        maritalHistory: [createMockHistory()],
        familyHistory: [createMockHistory()],
    };
}

export function createMockUsers(count: number): User[] {
    return Array.from({ length: count }, () => createMockUser());
}
