import { envs } from "./config";
import { MongoDatabase } from "./data/mongoDB";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(()=>{
  main()
})();


async function main(){

  await MongoDatabase.connect({
    mongoUrl:envs.MONGO_URL,
    dbName:envs.MONGO_DB_NAME,
  });
  new Server({
    port:envs.PORT,
    routes:AppRoutes.routes
  }).start()
}

