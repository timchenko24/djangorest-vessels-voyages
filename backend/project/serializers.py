from rest_framework.serializers import ModelSerializer
from rest_framework_jwt.serializers import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

    def update(self, instance, validated_data):

        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)

        return super(UserSerializer, self).update(instance, validated_data)
