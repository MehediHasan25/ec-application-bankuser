import {hostIp} from './IpAdd';

export const userLogin = hostIp + `shared/login`;
export const eKycVerification = hostIp + `user/ekyc-verification`;
export const pendingList = hostIp + `user/get-all-pending-ekyc`;
export const pendingVerify = hostIp + `user/post-ekyc-verification`;
export const kycHistory = hostIp + `user/get-ekyc`;
export const searchUserNid = hostIp + `user/get-ekyc-by-nid`;
export const getNidImage = hostIp + `user/get-nid-image`;
