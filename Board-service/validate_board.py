import re

class BoardValidator:
    @staticmethod
    def validate_board_data(user_id, title, description, color):
        """
        Walidacja danych tablicy: user_id, tytuł, opis, kolor.
        """

        # Walidacja user_id
        if not user_id:
            return "user_id nie może być puste", False

        # Walidacja tytułu
        if not title or len(title) < 3 or len(title) > 100:
            return "Tytuł tablicy musi mieć od 3 do 100 znaków", False

        # Walidacja opisu
        if description and len(description) > 500:
            return "Opis tablicy nie może przekroczyć 500 znaków", False

        # Walidacja koloru
        if not color or not re.match(r'^#[0-9a-fA-F]{6}$', color):
            return "Kolor tablicy musi być w formacie HEX (#RRGGBB)", False

        return None, True
