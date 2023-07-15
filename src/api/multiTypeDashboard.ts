import { CommonTableResp } from './interface';

export const loadAdminOverallData = async () => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) resolve(null);
      else reject(new Error('load failed'));
    }, 1000);
  });
  return {
    value1: 1231,
    value2: 1232,
    value3: 1233,
    value4: 1234,
    value5: 1235,
    value6: 1236,
    value7: 1237,
    value8: 1238,
    value9: 1239,
    value10: 1240,
    value11: 1241,
    value12: 1242,
    percentValue1: 1231,
    percentValue2: 1232,
    percentValue3: 1233,
    percent1: 10,
    percent2: 100,
    percent3: 20,
    percent4: 0,
    percent5: 0,
    percent6: 30,
  };
};

export const loadStationOverallData = async () => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) resolve(null);
      else reject(new Error('load failed'));
    }, 1000);
  });
  return {
    value1: 1241,
    value2: 1242,
    value3: 1243,
    value4: 1244,
    value5: 1245,
    value6: 1246,
    value7: 1247,
    value8: 1248,
    value9: 1249,
    value10: 1250,
    value11: 1251,
    value12: 1252,
    percentValue1: 1241,
    percentValue2: 1242,
    percentValue3: 1243,
    percent1: 11,
    percent2: 101,
    percent3: 21,
    percent4: 0,
    percent5: 0,
    percent6: 31,
  };
};

export const loadAgencyOverallData = async () => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) resolve(null);
      else reject(new Error('load failed'));
    }, 1000);
  });
  return {
    value5: 1255,
    value6: 1256,
    value7: 1257,
    value8: 1258,
    value9: 1259,
    value10: 1260,
    value11: 1261,
    value12: 1262,
    percentValue1: 1251,
    percentValue2: 1252,
    percentValue3: 1253,
    percent1: 12,
    percent2: 102,
    percent3: 22,
    percent4: 0,
    percent5: 0,
    percent6: 32,
  };
};

const getNumberArray = ({ pageNum, pageSize, total }: { pageNum: number, pageSize: number, total: number }) => Array(pageSize).fill(0)
  .map((_, i) => (pageNum - 1) * pageSize + i + 1)
  .filter((v) => v <= total);

const adminMockDetailData = (params: { pageNum: number, pageSize: number }) => ({
  total: 100,
  list: getNumberArray({ ...params, total: 100 })
    .map((v) => ({
      field1: `admin-f1-${v}`,
      field2: `admin-f2-${v}`,
      field3: `admin-f3-${v}`,
      field4: `admin-f4-${v}`,
    })),
});

const stationMockDetailData = (params: { pageNum: number, pageSize: number }) => ({
  total: 100,
  list: getNumberArray({ ...params, total: 100 })
    .map((v) => ({
      field1: `station-f1-${v}`,
      field2: `station-f2-${v}`,
      field5: `station-f5-${v}`,
      field6: `station-f6-${v}`,
    })),
});

const agencyMockDetailData = (params: { pageNum: number, pageSize: number }) => ({
  total: 100,
  list: getNumberArray({ ...params, total: 100 })
    .map((v) => ({
      field3: `agency-f3-${v}`,
      field4: `agency-f4-${v}`,
      field5: `agency-f5-${v}`,
      field6: `agency-f6-${v}`,
    })),
});

export interface AdminDetailParams {
  pageNum: number
  pageSize: number
  field1: string
  field2: string
  field3: string
  field4: string
}

export type AdminDetailResp = Array<{
  field1: string
  field2: string
  field3: string
  field4: string
}>

export const loadAdminDetailData = async (params: AdminDetailParams)
  : Promise<CommonTableResp<AdminDetailResp>> => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) resolve(null);
      else reject(new Error('load detail failed'));
    }, 1500);
  });
  return {
    retcode: 0,
    message: '',
    data: adminMockDetailData({ pageNum: params.pageNum, pageSize: params.pageSize }),
  };
};

export interface StationDetailParams {
  pageNum: number
  pageSize: number
  field1: string
  field2: string
  field5: string
  field6: string
}

export type StationDetailResp = Array<{
  field1: string
  field2: string
  field5: string
  field6: string
}>

export const loadStationDetailData = async (params: StationDetailParams)
  : Promise<CommonTableResp<StationDetailResp>> => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) resolve(null);
      else reject(new Error('load detail failed'));
    }, 1500);
  });
  return {
    retcode: 0,
    message: '',
    data: stationMockDetailData({ pageNum: params.pageNum, pageSize: params.pageSize }),
  };
};

export interface AgencyDetailParams {
  pageNum: number
  pageSize: number
  field3: string
  field4: string
  field5: string
  field6: string
}

export type AgencyDetailResp = Array<{
  field3: string
  field4: string
  field5: string
  field6: string
}>

export const loadAgencyDetailData = async (params: AgencyDetailParams)
  : Promise<CommonTableResp<AgencyDetailResp>> => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) resolve(null);
      else reject(new Error('load detail failed'));
    }, 1500);
  });
  return {
    retcode: 0,
    message: '',
    data: agencyMockDetailData({ pageNum: params.pageNum, pageSize: params.pageSize }),
  };
};
