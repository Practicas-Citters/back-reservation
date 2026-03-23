
import { User, UserRole } from '../src/domain/entities/user.entity.js';
import { InMemoryUserRepository } from '../src/infrastructure/repositories/in-memory-user.repository.js';
import { Organization } from '../src/domain/entities/organization.entity.js';
import { InMemoryOrganizationRepository } from '../src/infrastructure/repositories/in-memory-organization.repository.js';
import { Court } from '../src/domain/entities/court.entity.js';
import { InMemoryCourtRepository } from '../src/infrastructure/repositories/in-memory-court.repository.js';
import { Sport } from '../src/domain/entities/sport.entity.js';
import { InMemorySportRepository } from '../src/infrastructure/repositories/in-memory-sport.repository.js';

async function testSport(repo: InMemorySportRepository) {
    console.log('--- Testing Sport ---');
    const sport = new Sport('1', 'Football', 'url', 11, 22);
    await repo.create(sport);

    const searches = ['Football', 'football', 'FOOTBALL', 'fOoTbAlL'];
    for (const term of searches) {
        const result = await repo.getByName(term);
        console.log(`Search "${term}": ${result ? 'PASSED' : 'FAILED'}`);
    }
}

async function testUser(repo: InMemoryUserRepository) {
    console.log('\n--- Testing User ---');
    const user = new User('1', 'Full Name', 'JohnDoe', 'john@example.com', 'pass', '123', '2000-01-01', UserRole.CLIENT, '', false, 0);
    await repo.create(user);

    console.log('Email "JOHN@EXAMPLE.COM":', (await repo.getByEmail('JOHN@EXAMPLE.COM')) ? 'PASSED' : 'FAILED');
    console.log('Username "johndoe":', (await repo.getByUsername('johndoe')) ? 'PASSED' : 'FAILED');
}

async function testOrganization(repo: InMemoryOrganizationRepository) {
    console.log('\n--- Testing Organization ---');
    const org = new Organization('1', 'My Org', 'Desc', 'org@example.com', '123', 'Street 1', 'Madrid', '28001', '', '', true, []);
    await repo.create(org);

    console.log('Name "MY ORG":', (await repo.getByName('MY ORG')) ? 'PASSED' : 'FAILED');
    console.log('Email "ORG@EXAMPLE.COM":', (await repo.getByEmail('ORG@EXAMPLE.COM')) ? 'PASSED' : 'FAILED');
    console.log('Address "STREET 1":', (await repo.getByAddress('STREET 1')) ? 'PASSED' : 'FAILED');
    console.log('City "madrid":', (await repo.getByCity('madrid')).length > 0 ? 'PASSED' : 'FAILED');
}

async function testCourt(repo: InMemoryCourtRepository) {
    console.log('\n--- Testing Court ---');
    const sport = new Sport('1', 'Tennis', 'url', 2, 4);
    const org = new Organization('1', 'My Org', 'Desc', 'org@example.com', '123', 'Street 1', 'Madrid', '28001', '', '', true, []);
    const court = new Court('1', 'Blue Court', 'Desc', 'img', 4, 20, 'Barcelona', true, sport, org);
    await repo.create(court);

    console.log('Name "BLUE COURT":', (await repo.getByName('BLUE COURT')) ? 'PASSED' : 'FAILED');
    console.log('Location "barcelona":', (await repo.getByLocation('barcelona')).length > 0 ? 'PASSED' : 'FAILED');
}


async function runAllTests() {
    try {
        await testSport(new InMemorySportRepository());
        await testUser(new InMemoryUserRepository());
        await testOrganization(new InMemoryOrganizationRepository());
        await testCourt(new InMemoryCourtRepository());
        console.log('\nAll repository search tests completed.');
    } catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
}

runAllTests();
