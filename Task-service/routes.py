from flask import jsonify, request
from models import TaskModel

def register_routes(app):
    task_model = TaskModel()

    @app.route('/tasks', methods=['GET'])
    def get_tasks():
        tasks = task_model.get_all_tasks()
        return jsonify(tasks)

    @app.route('/tasks', methods=['POST'])
    def create_task():
        task_data = request.json
        title = task_data.get('title')
        description = task_data.get('description')
        status = task_data.get('status', 'do zrobienia')
        task = task_model.create_task(title, description, status)
        return jsonify(task), 201

    @app.route('/tasks/<task_id>', methods=['PUT'])
    def update_task(task_id):
        task_data = request.json
        title = task_data.get('title')
        description = task_data.get('description')
        status = task_data.get('status')
        updated_task = task_model.update_task(task_id, title, description, status)
        if updated_task is None:
            return jsonify({'error': 'Task not found'}), 404
        return jsonify(updated_task)

    @app.route('/tasks/<task_id>', methods=['DELETE'])
    def delete_task(task_id):
        result = task_model.delete_task(task_id)
        if result is None:
            return jsonify({'error': 'Task not found'}), 404
        return jsonify(result), 200
