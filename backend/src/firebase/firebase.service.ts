import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  DocumentData,
  Firestore,
  getFirestore,
  WhereFilterOp,
  FieldPath,
} from 'firebase-admin/firestore';
import { cert, initializeApp } from 'firebase-admin/app';
import { auth } from 'firebase-admin';

type collections = 'todos'; //Add collections here ('collection1' | 'collection2' | ...)

@Injectable()
export class FirebaseService {
  private readonly firestore: Firestore;
  private readonly collections: {
    [key in collections]: CollectionReference;
  };

  constructor() {
    initializeApp({ credential: cert(JSON.parse(process.env.FIRESTORE_KEY)) });
    this.firestore = getFirestore();
    this.collections = {
      todos: this.firestore.collection('todos'),
      //Add collections here
    };
  }

  getFirestore(): Firestore {
    return this.firestore;
  }

  getCollection(collection: collections): CollectionReference {
    return this.collections[collection];
  }

  getDocumentReference(
    collection: collections,
    document: string,
  ): DocumentReference {
    try {
      return this.getCollection(collection).doc(document);
    } catch (error) {
      throw new BadRequestException('Something went wrong...');
    }
  }

  async getDocumentSnapshot(
    collection: collections,
    document: string,
  ): Promise<DocumentSnapshot> {
    try {
      return await this.getDocumentReference(collection, document).get();
    } catch (error) {
      throw new BadRequestException('Something went wrong...');
    }
  }

  async documentExists(
    collection: collections,
    document: string,
  ): Promise<boolean> {
    try {
      return (await this.getDocumentSnapshot(collection, document)).exists;
    } catch (error) {
      throw new BadRequestException('Something went wrong...');
    }
  }

  async getDocument(
    collection: collections,
    document: string,
  ): Promise<DocumentData> {
    const documentSnapshot = await this.getDocumentSnapshot(
      collection,
      document,
    );
    if (documentSnapshot.exists) {
      try {
        return documentSnapshot.data();
      } catch (error) {
        throw new BadRequestException('Something went wrong...');
      }
    } else {
      throw new NotFoundException('Document not found');
    }
  }

  async getAllDocuments(collection: collections): Promise<DocumentData[]> {
    try {
      return (await this.getCollection(collection).get()).docs.map((doc) =>
        doc.data(),
      );
    } catch (error) {
      throw new BadRequestException('Something went wrong...');
    }
  }

  async getAllDocumentsWhere(
    collection: collections,
    attribute: string | FieldPath,
    operator: WhereFilterOp,
    value: any,
  ): Promise<DocumentData[]> {
    try {
      return (
        await this.getCollection(collection)
          .where(attribute, operator, value)
          .get()
      ).docs.map((doc) => doc.data());
    } catch (error) {
      throw new BadRequestException('Something went wrong...');
    }
  }

  async setDocument(
    collection: collections,
    document: string,
    documentData: DocumentData,
  ): Promise<void> {
    if (!(await this.documentExists(collection, document))) {
      try {
        await this.getDocumentReference(collection, document).set(documentData);
      } catch (error) {
        throw new BadRequestException('Something went wrong...');
      }
    } else {
      throw new BadRequestException('Document already exists');
    }
  }

  async updateDocument(
    collection: collections,
    document: string,
    documentData: DocumentData,
  ): Promise<void> {
    if (await this.documentExists(collection, document)) {
      try {
        await this.getDocumentReference(collection, document).update(
          documentData,
        );
      } catch (error) {
        throw new BadRequestException('Something went wrong...');
      }
    } else {
      throw new NotFoundException('Document not found');
    }
  }

  async deleteDocument(
    collection: collections,
    document: string,
  ): Promise<void> {
    if (await this.documentExists(collection, document)) {
      try {
        await this.getDocumentReference(collection, document).delete();
      } catch (error) {
        throw new BadRequestException('Something went wrong...');
      }
    } else {
      throw new NotFoundException('Document not found');
    }
  }

  async setUserRole(email: string, role: string): Promise<void> {
    try {
      const { uid } = await auth().getUserByEmail(email);
      await auth().setCustomUserClaims(uid, { role });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
