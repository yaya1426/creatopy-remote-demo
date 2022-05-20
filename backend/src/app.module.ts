import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ConfigModule } from 'config/config.module';
import { UsersModule } from 'modules/users/users.module';
import { ItemsModule } from 'modules/items/items.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [
    // ## SEQUELIZE SETUP
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'db/data.db',
      autoLoadModels: true,
      synchronize: true,
    }),
    // ## GRAPHQL SETUP
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error?.extensions?.exception?.code || error?.message,
        };
        return graphQLFormattedError;
      },
    }),
    ConfigModule,
    UsersModule,
    ItemsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
