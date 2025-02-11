package com.yowpet.backend.service;

    import com.yowpet.backend.model.AnimalCategory;
    import com.yowpet.backend.repository.AnimalCategortRepository;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @Service
    public class AnimalCategoryService {

        @Autowired
        private AnimalCategortRepository repo;

        public AnimalCategory getbyID(long id) {
            return repo.findById(id).orElseThrow(() -> new RuntimeException("Animal Category not found"));
        }

        public List<AnimalCategory> getAll() {
            return repo.findAll();
        }

        public void create(AnimalCategory category) {
            repo.save(category);
        }

        public AnimalCategory update(Long id, AnimalCategory category) {
            category.setId(id);
            System.out.println("AnimalCategory ID: " + category.getId());
            repo.save(category);
        return category;
        }

        public void delete(Long id) {
            repo.deleteById(id);
        }

        public List<AnimalCategory> search(String acName) {
            return repo.findByNameContaining(acName);
        }
    }