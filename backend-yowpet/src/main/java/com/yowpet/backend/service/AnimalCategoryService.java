package com.yowpet.backend.service;

    import com.yowpet.backend.model.AnimalCategory;
    import com.yowpet.backend.repository.AnimalCategoryRepo;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.util.List;

    @Service
    public class AnimalCategoryService {

        @Autowired
        private AnimalCategoryRepo repo;

        public AnimalCategory getbyID(int id) {
            return repo.getAnimalCategory(id);
        }

        public List<AnimalCategory> getAll() {
            return repo.getAnimalCategories();
        }

        public void create(AnimalCategory category) {
            repo.createAnimalCategory(category.getName());
        }

        public AnimalCategory update(int id, AnimalCategory category) {
            category.setId(id);
            System.out.println("AnimalCategory ID: " + category.getId());
            repo.updateAnimalCategory(category.getId(),category.getName());
        return category;
        }

        public void delete(int id) {
            repo.deleteAnimalCategory(id);
        }

        public List<AnimalCategory> search(String acName) {
            return repo.searchAnimalCategories(acName);
        }
    }