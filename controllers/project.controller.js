import { parse } from 'csv-parse';
import Project from '../models/project.model';

const projectController = {
  async uploadProjects(req, res) {
    const file = req.file.buffer;

    let preparedData;
    parse(file, { delimiter: ',', from_line: 2 }, async (err, data) => {
      if (err) {
        return res.status(400).json({
          message: 'Error while parsing file',
          error: err
        });
      }

      preparedData = data.map((row) => {
        return { name: row[0], description: row[1], price: row[2] };
      });


    });

    try {
      await Project.deleteMany({});
      await Project.insertMany(preparedData);
    }
    catch (error) {
      console.error('Error during uploading files occured:', error);
      return res.status(400).json({ message: 'Error during uploading files occured.' });
    }

    return res.sendStatus(200);
  },

  async getProjects(req, res) {
    const projects = await Project.find({});
    res.json(projects);
  }
};

export default projectController;