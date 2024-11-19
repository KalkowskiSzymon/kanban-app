from bson.objectid import ObjectId
from db import get_db_connection

class TaskModel:
    def __init__(self):
        self.db = get_db_connection()
        self.tasks_collection = self.db['tasks']

    def get_all_tasks(self):
        """Pobieranie wszystkich zadań z bazy"""
        tasks = list(self.tasks_collection.find())
        for task in tasks:
            task['_id'] = str(task['_id'])  # Konwertujemy ObjectId na string
        return tasks

    def create_task(self, title, description, status='do zrobienia'):
        """Tworzenie nowego zadania"""
        task = {
            'title': title,
            'description': description,
            'status': status
        }
        result = self.tasks_collection.insert_one(task)
        task['_id'] = str(result.inserted_id)
        return task

    def update_task(self, task_id, title, description, status):
        """Aktualizacja zadania"""
        updated_task = {
            'title': title,
            'description': description,
            'status': status
        }
        result = self.tasks_collection.update_one(
            {'_id': ObjectId(task_id)}, {'$set': updated_task}
        )
        if result.matched_count == 0:
            return None  # Zadanie nie zostało znalezione
        updated_task['_id'] = task_id
        return updated_task

    def delete_task(self, task_id):
        """Usuwanie zadania"""
        result = self.tasks_collection.delete_one({'_id': ObjectId(task_id)})
        if result.deleted_count == 0:
            return None  # Zadanie nie zostało znalezione
        return {'message': 'Task deleted'}
