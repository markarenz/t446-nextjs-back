import AWS from 'aws-sdk';
import { Alert } from '@prisma/client';
import {
  createAlert,
  getItemsAlerts,
  getItemAlert,
  updateAlert,
  deleteAlert,
  publishAlerts
} from '../../../../src/utility/db/queries/alerts';
import prisma from '../../../../lib/prismadb';
const defaultDate = new Date('2022-12-01');

const alert: Alert = {
  id: 'abcd123',
  title: 'test alert',
  status: 'inactive',
  content: 'Test content',
  alwaysOn: false,
  dateStart: defaultDate,
  dateEnd: defaultDate,
  dateCreated: defaultDate,
  dateModified: defaultDate
};

jest.mock('aws-sdk', () => {
  const mockedS3 = {
    upload: jest.fn().mockReturnThis(),
    promise: jest.fn()
  };
  return { S3: jest.fn(() => mockedS3) };
});

jest.mock('../../../../lib/prismadb', () => ({
  alert: {
    create: jest.fn(() => ({
      success: true,
      alert
    })),
    count: jest.fn(() => 1),
    findMany: jest.fn(() => [alert]),
    findUnique: jest.fn(() => alert),
    update: jest.fn(),
    delete: jest.fn()
  }
}));

afterAll(() => {
  jest.resetAllMocks();
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('alerts', () => {
  describe('createAlert', () => {
    it('calls prisma function', () => {
      createAlert();
      expect(prisma.alert.create).toHaveBeenCalled();
    });
  });
  describe('getItemsAlerts', () => {
    it('calls prisma functions: count, findMany', () => {
      getItemsAlerts('', 0, 10);
      expect(prisma.alert.count).toHaveBeenCalled();
    });
  });

  describe('getItemAlert', () => {
    it('calls prisma functions: findUnique', () => {
      getItemAlert('abcd123');
      expect(prisma.alert.findUnique).toHaveBeenCalled();
    });
  });

  describe('updateAlert', () => {
    it('calls prisma functions: update', () => {
      updateAlert('abcd123', alert);
      expect(prisma.alert.update).toHaveBeenCalled();
    });
  });

  describe('deleteAlert', () => {
    it('calls prisma functions: update', () => {
      deleteAlert('abcd123');
      expect(prisma.alert.delete).toHaveBeenCalled();
    });
  });

  describe('publishAlerts', () => {
    it('calls prisma functions: update', () => {
      // const mockedS3 = new AWS.S3();
      publishAlerts();
      expect(prisma.alert.findMany).toHaveBeenCalled();
    });
    it('handles error', () => {
      publishAlerts();
      // expect(prisma.alert.findMany).toHaveBeenCalled();
      // expect(AWS.s3.upload).toHaveBeenCalled();
    });
  });
});
