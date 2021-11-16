import { throws } from "assert";
import { Application, Request, Response } from "express";
import { Client } from "pg";

import CoursesData from "../../data/courses.json";

const client = new Client({
  user: "kvwnnbklxemlfr",
  host: "ec2-107-20-24-247.compute-1.amazonaws.com",
  database: "de1kesrte1ut12",
  password: "ff48c62309c32a67e629c5a90b09724832775467e2dfe8fd051b59062a315e83",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

export const loadApiEndpoints = (app: Application): void => {
  app.get("/autos", async (req: Request, response: Response) => {
    try {
      const res = await client.query("SELECT * FROM autos ");

      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/autos/:id", async (req: Request, response: Response) => {
    const id = parseInt(req.params.id);
    try {
      const res = await client.query("SELECT * FROM autos WHERE id = $1", [id]);
      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/autos/categoria/:id", async (req: Request, response: Response) => {
    const id = parseInt(req.params.id);
    try {
      const res = await client.query(
        "SELECT * from autos  WHERE idcategoria = $1",
        [id]
      );
      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/categorias", async (req: Request, response: Response) => {
    try {
      const res = await client.query("SELECT * FROM categoria ");

      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/courses/", async (req: Request, response: Response) => {
    try {
      const res = await client.query("SELECT * FROM courses");

      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
    }
  });

  app.get(
    "/courses/especialidad/:id",
    async (req: Request, response: Response) => {
      const id = parseInt(req.params.id);
      try {
        const res = await client.query(
          "SELECT * FROM courses WHERE idespecialidad = $1",
          [id]
        );
        response.status(200).json(res.rows);
      } catch (error) {
        console.log(error);
      }
    }
  );

  app.get("/especialidades/", async (req: Request, response: Response) => {
    try {
      const res = await client.query("SELECT * FROM especialidad ");
      response.status(200).json(res.rows);
    } catch (error) {
      console.log(error);
    }
  });
  app.post("/auth", async (req: Request, response: Response) => {
    const { user, pass } = req.body;
    const query = {
      name: "fetch-user",
      text: "SELECT * FROM users WHERE usuario LIKE  $1 ",
      values: [user],
    };

    try {
      const res = await client.query(query);
      if (res.rowCount == 0)
        return response.json({ message: "usuario no existe" });
      if (res.rows[0].pass !== pass)
        return response.json({ message: "password incorrecto" });
      return response.json(res.rows[0]);
    } catch (e) {
      throws;
    }
  });
};
