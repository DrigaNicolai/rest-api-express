class CreatePostRequestDTO {
  constructor(author_id, title, text, tag_id) {
    this.author_id = author_id;
    this.title = title;
    this.text = text;
    this.tag_id = tag_id;
  }
}

class EditPostRequestDTO {
  constructor(id, author_id, title, text, tag_id) {
    this.id = id;
    this.author_id = author_id;
    this.title = title;
    this.text = text;
    this.tag_id = tag_id;
  }
}

class PostResponseDTO {
  constructor (post) {
    this.id = post.id;
    this.author_id = post.author_id;
    this.title = post.title;
    this.text = post.text;
    this.tag_id = post.tag_id;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
  }
}

class PostCatalogResponseDTO {
  constructor (posts) {
    this.items = posts.map(post => ({
      id: post.id,
      author: post.author,
      title: post.title,
      text: post.text,
      tag: post.tag,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }));
  }
}

module.exports = {
  CreatePostRequestDTO,
  EditPostRequestDTO,
  PostResponseDTO,
  PostCatalogResponseDTO
}
