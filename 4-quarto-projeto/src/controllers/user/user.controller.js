import UserService from "../../services/user/user.service.js";

class UserController {
  async create(req, res) {
    try {
      const response = await UserService.create(req.body);
      if (response) {
        return res.status(201).json(req.body);
      }
      return res.status(400).json({ message: 'Email já cadastrado' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async list(req, res) {
    try {
      const response = await UserService.searchUsers();
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error'});
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const response = await UserService.update(req.body, id);
      if (response) {
        return res.status(201).json(req.body);
      }
      return res.status(400).json({ message: 'Email já cadastrado' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      await UserService.delete(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new UserController();
