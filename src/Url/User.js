import {hostIp} from './IpAdd';

export const userLogin = hostIp + `shared/login`;
export const eKycVerification = hostIp + `user/ekyc-verification`;
export const pendingList = hostIp + `user/get-all-pending-ekyc`;
export const pendingVerify = hostIp + `user/post-ekyc-verification`;