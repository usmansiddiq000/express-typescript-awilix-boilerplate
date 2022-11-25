import { asClass } from "awilix";
import { container } from "./config";
import { HomeController } from "./controllers";
import { ErrorHandler } from "./middleware";
import { HomeRouter } from "./routes";

container.register({
    homeController: asClass(HomeController),
    homeRouter: asClass(HomeRouter),
    errorHandler: asClass(ErrorHandler)
});

