from rest_framework import serializers

class AuthorYearGenderSerialiezer(serializers.Serializer):
    authors=serializers.ListField()
    years=serializers.ListField()
    genders=serializers.ListField()