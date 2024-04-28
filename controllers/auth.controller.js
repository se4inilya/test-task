import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { initialUser } from '../config/constants';

const authController = {
  async login(req, res) {
    const { email, password } = req.body;
    if (email !== initialUser.email) return res.status(404).send('User was not found');
    const isMatch = compare(password, initialUser.password);
    if (!isMatch) return res.status(401).send('Authentication was failed');
    const expiresIn = 60 * 60;
    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: expiresIn
    });
    res.status(200).send({ 'access_token': accessToken, 'expires_in': expiresIn });
  }
};

export default authController;