"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("../config/index"));
const index_2 = __importDefault(require("../api/index"));
const express_session_1 = __importDefault(require("express-session"));
exports.default = (app) => {
    app.enable('proxy');
    app.use((0, express_session_1.default)({
        secret: index_1.default.SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use((0, cors_1.default)());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use(index_1.default.API_PREFIX, (0, index_2.default)());
    app.get("/status", (req, res) => {
        res.status(200).send();
    });
    app.head("/status", (req, res) => {
        res.status(200).send();
    });
    //error 404
    app.use((req, res, next) => {
        const error = new Error('Not Found');
        error['status'] = 404;
        next(error);
    });
    app.use((err, req, res, next) => {
        if (err.message == "Unauthorized") {
            err['status'] = 403;
        }
        next(err);
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            message: err.message || "An Error Occured"
        }).end();
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2FkZXJzL2V4cHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBNkI7QUFDN0Isd0RBQStCO0FBQy9CLGdEQUF1QjtBQUN2Qiw0REFBb0M7QUFDcEMseURBQWlDO0FBQ2pDLHNFQUFxQztBQUVyQyxrQkFBZSxDQUFDLEdBQXlCLEVBQUUsRUFBRTtJQUU1QyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ25CLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSx5QkFBTyxFQUFDO1FBQ2YsTUFBTSxFQUFFLGVBQU0sQ0FBQyxjQUFjO1FBQzdCLE1BQU0sRUFBRSxLQUFLO1FBQ2IsaUJBQWlCLEVBQUUsSUFBSTtLQUN2QixDQUFDLENBQUMsQ0FBQTtJQUNILEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFBO0lBQzlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSxjQUFJLEdBQUUsQ0FBQyxDQUFBO0lBQ2YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUE7SUFDN0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7SUFDdkIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFNLENBQUMsVUFBVSxFQUFFLElBQUEsZUFBTSxHQUFFLENBQUMsQ0FBQTtJQUVwQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUMsRUFBRTtRQUU5QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ3ZCLENBQUMsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFDLEVBQUU7UUFFL0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUN2QixDQUFDLENBQUMsQ0FBQTtJQUVGLFdBQVc7SUFDWCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUMsRUFBRTtRQUV6QixNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUVwQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFBO1FBRXJCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNaLENBQUMsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxFQUFFO1FBRTlCLElBQUcsR0FBRyxDQUFDLE9BQU8sSUFBSSxjQUFjLEVBQUM7WUFFaEMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtTQUNuQjtRQUVELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNWLENBQUMsQ0FBQyxDQUFBO0lBRUYsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxFQUFFO1FBRTlCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQTtRQUU3QixHQUFHLENBQUMsSUFBSSxDQUFDO1lBRVIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLElBQUksa0JBQWtCO1NBRTFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUVULENBQUMsQ0FBQyxDQUFBO0FBRUgsQ0FBQyxDQUFBIn0=