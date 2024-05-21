import PostModel from "../models/Post.js";



export const createPost = async (req, res) => {
    try {
      if (!req.body.text) {
        return res.status(400).json({ message: 'Поле text обязательно для заполнения' });
      }
      
      const tracksArray = req.body.text.toString(); 
      const doc = new PostModel({
        text: tracksArray,
        user: req.userId,
      });
  
      const post = await doc.save();
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Не удалось создать пост'
      });
    }
  };
export const getAllPosts = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось получить посты'
        })
    }
};




export const getPost = async (req, res) => {
    try {
        const searchText = req.params.text; // Извлекаем текст из параметров запроса
        const posts = await PostModel.find({ text: searchText }).populate('user').exec();
        res.json(posts)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось получить посты'
        })
    }
};


export const getMyPosts = async (req, res) => {
    try {
        const userId = req.userId;
        const posts = await PostModel.find({ user: userId }).populate('user').exec();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Не удалось получить посты' });
    }
};


export const removePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModel.findOneAndDelete({ _id: postId });
    
        if (!doc) {
          return res.status(404).json({
            message: 'Не удалось найти пост',
          });
        }
    
        res.json({
          success: true,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'Произошла ошибка при удалении поста',
        });
      }
};


export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.updateOne({
            _id: postId,
        }, {
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        });
        res.json({
            success: true,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось обновить пост'
        })
    }
};







  