export default {
  dbName: process.env.DATABASE ?? 'upd8',
  dbUser: process.env.USERDB ?? 'root',
  dbPassword: process.env.PASSWORD ?? 'root',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'tj670==5H'
}
