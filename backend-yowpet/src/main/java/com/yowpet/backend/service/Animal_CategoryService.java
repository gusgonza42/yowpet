package com.yowpet.backend.service;

    import com.yowpet.backend.model.Animal_Category;
    import com.yowpet.backend.repository.Animal_CategortRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @Service
    public class Animal_CategoryService {

        @Autowired
        private Animal_CategortRepository repo;

        public Animal_Category getbyID(long id) {
            return repo.findById(id).orElseThrow(() -> new RuntimeException("Animal Category not found"));
        }

        public List<Animal_Category> getAll() {
            return repo.findAll();
        }

        public void create(Animal_Category category) {
            repo.save(category);
        }

        public Animal_Category update(Long id, Animal_Category category) {
            category.setId(id);
            System.out.println("Animal_Category ID: " + category.getId());
            repo.save(category);
        return category;
        }

        public void delete(Long id) {
            repo.deleteById(id);
        }

        public List<Animal_Category> search(String acName) {
            return repo.findByNameContaining(acName);
        }
    }