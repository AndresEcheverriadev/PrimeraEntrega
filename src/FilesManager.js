import fs from "fs";

class Productos {
  constructor(filename) {
    this.path = `./src/Database/${filename}.json`;
  }

  async getAll() {
    try {
      const file = await fs.promises.readFile(this.path);
      return JSON.parse(file);
    } catch (error) {
      await fs.promises.writeFile(this.path, JSON.stringify([]));
      return [];
    }
  }

  async save(element) {
    try {
      const elements = await this.getAll();
      element.id = elements.length === 0 ? 1 : elements[elements.length - 1].id + 1;
      element.timestamp = new Date();
      elements.push(element);
      await fs.promises.writeFile(this.path, JSON.stringify(elements, null, 2));
      return elements;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const elements = await this.getAll();
      const element = elements.find((e) => e.id == id);

      return element;
    } catch (error) {
      return error;
    }
  }

  async updateById(id, newData) {
    try {
      const elements = await this.getAll();

      const elementIndex = elements.findIndex((e) => e.id == id);

      if (elementIndex === -1) return { error: "elemento no existe" };

      elements[elementIndex] = { ...elements[elementIndex], ...newData };

      await fs.promises.writeFile(this.path, JSON.stringify(elements, null, 3));

      return elements[elementIndex];
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const elements = await this.getAll();

      const elementIndex = elements.findIndex((e) => e.id == id);

      if (elementIndex === -1) return { error: "Elemento no existe" };

      const newElements = elements.filter((e) => e.id != id);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(newElements, null, 3)
      );

      return elements;
    } catch (error) {
      return elements;
    }
  }
}

export { Productos };