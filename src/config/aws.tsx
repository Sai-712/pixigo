import { S3Client } from '@aws-sdk/client-s3';
import { RekognitionClient } from '@aws-sdk/client-rekognition';

const region = import.meta.env.VITE_AWS_REGION;
const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
const bucketName = import.meta.env.VITE_S3_BUCKET_NAME;

// Check if running in development mode
const isDevelopment = import.meta.env.DEV;

// In development mode, we'll use mock implementations
class MockS3Client {
  async send(command: any) {
    console.log('Mock S3 operation:', command.constructor.name);
    return { success: true };
  }
}

class MockRekognitionClient {
  async send(command: any) {
    console.log('Mock Rekognition operation:', command.constructor.name);
    return {
      FaceMatches: [
        { 
          Face: { 
            ExternalImageId: 'mock-image-1.jpg',
            Confidence: 99.9
          },
          Similarity: 98.5
        },
        { 
          Face: { 
            ExternalImageId: 'mock-image-2.jpg',
            Confidence: 95.2
          },
          Similarity: 92.1
        }
      ]
    };
  }
}

// Use mock clients in development, real clients in production
export const s3Client = isDevelopment 
  ? (new MockS3Client() as unknown as S3Client)
  : new S3Client({
      region,
      credentials: {
        accessKeyId: accessKeyId || '',
        secretAccessKey: secretAccessKey || '',
      },
    });

export const rekognitionClient = isDevelopment
  ? (new MockRekognitionClient() as unknown as RekognitionClient)
  : new RekognitionClient({
      region,
      credentials: {
        accessKeyId: accessKeyId || '',
        secretAccessKey: secretAccessKey || '',
      },
    });

export const S3_BUCKET_NAME = bucketName || 'att-imgs';