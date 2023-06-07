import { IUserMin } from "./IUser"

interface IAlert {
  id: string
  owner: IUserMin
  tag: string
  timestamp: string
  recipient: string
}

export default IAlert