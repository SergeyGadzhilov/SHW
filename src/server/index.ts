import { main } from "./routes/main";
import { support } from "./routes/support";
import { Settings } from "./app/Settings";
import { Application } from "./app/Application";
import { accounts } from "./routes/accounts";

const settings = Settings.getInstance();
const app = new Application();

app.registerStatic(__dirname + "/public");
app.registerRoutes("", main);
app.registerRoutes("/support", support);
app.registerRoutes("/accounts", accounts);

app.start(settings.port);
