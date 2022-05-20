import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    // ## SEQUELIZE SETUP
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'db/demo.db',
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
