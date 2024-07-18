import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

class UserService {
    async updateUser(userId, orgId, userData) {
        return prisma.$transaction(async (prisma) => {
            const { address, contact, dates, documents, ...mainUserData } = userData;

            // Update main user data
            const updatedUser = await this.updateMainUserData(prisma, userId, orgId, mainUserData);

            // Update or create related records
            if (address) {
                await this.updateOrCreateUserAddress(prisma, userId, address);
            }

            if (contact) {
                await this.updateOrCreateUserContact(prisma, userId, contact);
            }

            if (dates) {
                await this.updateOrCreateUserDates(prisma, userId, dates);
            }

            if (documents) {
                await this.updateOrCreateUserDocuments(prisma, userId, documents);
            }

            // Fetch and return the updated user with all related data
            return this.getUserWithRelations(prisma, userId, orgId);
        });
    }

    async updateMainUserData(prisma, userId, orgId, userData) {
        const { password, ...otherData } = userData;

        const data = { ...otherData };

        if (password) {
            const hash = await bcrypt.hash(password, 10);
            data.password = hash;
        }

        return prisma.users.update({
            where: { user_id: parseInt(userId), org_id: parseInt(orgId) },
            data
        });
    }

    async updateOrCreateUserAddress(prisma, userId, addressData) {
        const existingAddress = await prisma.user_addresses.findFirst({
            where: { user_id: parseInt(userId) }
        });

        if (existingAddress) {
            return prisma.user_addresses.update({
                where: { address_id: existingAddress.address_id },
                data: addressData
            });
        } else {
            return prisma.user_addresses.create({
                data: { ...addressData, user_id: parseInt(userId) }
            });
        }
    }

    async updateOrCreateUserContact(prisma, userId, contactData) {
        const existingContact = await prisma.user_contacts.findFirst({
            where: { user_id: parseInt(userId) }
        });

        if (existingContact) {
            return prisma.user_contacts.update({
                where: { contact_id: existingContact.contact_id },
                data: contactData
            });
        } else {
            return prisma.user_contacts.create({
                data: { ...contactData, user_id: parseInt(userId) }
            });
        }
    }

    async updateOrCreateUserDates(prisma, userId, datesData) {
        const existingDates = await prisma.user_dates.findFirst({
            where: { user_id: parseInt(userId) }
        });

        if (existingDates) {
            return prisma.user_dates.update({
                where: { date_id: existingDates.date_id },
                data: datesData
            });
        } else {
            return prisma.user_dates.create({
                data: { ...datesData, user_id: parseInt(userId) }
            });
        }
    }

    async updateOrCreateUserDocuments(prisma, userId, documentsData) {
        const existingDocuments = await prisma.user_documents.findFirst({
            where: { user_id: parseInt(userId) }
        });

        if (existingDocuments) {
            return prisma.user_documents.update({
                where: { document_id: existingDocuments.document_id },
                data: documentsData
            });
        } else {
            return prisma.user_documents.create({
                data: { ...documentsData, user_id: parseInt(userId) }
            });
        }
    }

    async getUserWithRelations(prisma, userId, orgId) {
        return prisma.users.findUnique({
            where: { user_id: parseInt(userId), org_id: parseInt(orgId) },
            include: {
                user_addresses: true,
                user_contacts: true,
                user_dates: true,
                user_documents: true
            }
        });
    }
}

export default new UserService();