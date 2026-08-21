"""create posts table

Revision ID: 22804fad03b3
Revises: 
Create Date: 2026-08-21 10:52:33.936974

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '22804fad03b3'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.add_column(
        'posts',
        sa.Column('test_column', sa.String(), nullable=False, server_default='test')
    )
    pass


def downgrade():
    op.drop_column('posts', 'test_column')
    pass
