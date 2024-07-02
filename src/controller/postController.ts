import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Post } from '../entities/Post';

export class PostController {
  static create = async (req: Request, res: Response) => {
    const { title, body } = req.body;
    const postRepository = getRepository(Post);

    const post = new Post();
    post.title = title;
    post.body = body;
    post.user = req.userId;

    await postRepository.save(post);

    res.status(201).json(post);
  };

  static read = async (req: Request, res: Response) => {
    const postRepository = getRepository(Post);
    const posts = await postRepository.find({ where: { deleted_at: null } });

    res.json(posts);
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, body } = req.body;
    const postRepository = getRepository(Post);

    const post = await postRepository.findOne(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.title = title;
    post.body = body;

    await postRepository.save(post);

    res.json(post);
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const postRepository = getRepository(Post);

    const post = await postRepository.findOne(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.deleted_at = new Date();

    await postRepository.save(post);

    res.status(204).send();
  };
}
