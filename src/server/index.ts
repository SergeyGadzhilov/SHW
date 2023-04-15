import { main } from "./routes/main";
import { support } from "./routes/support";
import { Settings } from "./app/Settings";
import { Application } from "./app/Application";

const settings = new Settings();
const app = new Application();

app.registerStatic(__dirname + "/public");
app.registerRoutes("", main);
app.registerRoutes("/support", support);

app.start(settings.port);
