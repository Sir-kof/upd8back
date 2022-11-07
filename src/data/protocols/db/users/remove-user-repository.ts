export interface IRemoveUserRepository {
  remove: (userId: string) => Promise<boolean>
}
