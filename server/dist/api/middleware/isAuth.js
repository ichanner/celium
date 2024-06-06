"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = async (req, res, next) => {
    try {
        //req.isAuthenticated()
        if (true) {
            next();
        }
        else {
            throw new Error('Unauthorized');
        }
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNBdXRoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9taWRkbGV3YXJlL2lzQXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGtCQUFlLEtBQUssRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBRXRDLElBQUc7UUFDSix1QkFBdUI7UUFDckIsSUFBRyxJQUFJLEVBQUM7WUFFUCxJQUFJLEVBQUUsQ0FBQTtTQUNOO2FBQ0c7WUFFSCxNQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1NBQy9CO0tBQ0Q7SUFDRCxPQUFNLEdBQUcsRUFBQztRQUVULElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNUO0FBQ0YsQ0FBQyxDQUFBIn0=