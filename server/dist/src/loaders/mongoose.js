import mongoose from 'mongoose';
export default async (connection_string) => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    const conn = await mongoose.connect(connection_string, options);
    return conn.connection.db;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbG9hZGVycy9tb25nb29zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFFBQTBCLE1BQU0sVUFBVSxDQUFBO0FBR2pELGVBQWUsS0FBSyxFQUFDLGlCQUEwQixFQUFFLEVBQUU7SUFFbEQsTUFBTSxPQUFPLEdBQUc7UUFDZixlQUFlLEVBQUUsSUFBSTtRQUNyQixrQkFBa0IsRUFBRSxJQUFJO0tBQ04sQ0FBQTtJQUVuQixNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFFL0QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQTtBQUMxQixDQUFDLENBQUEifQ==