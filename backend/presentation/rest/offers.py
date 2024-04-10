"""backend/presentation/rest/offers.py"""

from fastapi import APIRouter, Depends, Request, status

from backend.application.authentication import RoleRequired, get_current_user
from backend.domain.constants import UserRole
from backend.domain.employees import Employee, EmployeeRepository
from backend.domain.offers import (
    Offer,
    OfferCreateRequestBody,
    OfferPublic,
    OfferRepository,
    OfferUncommited,
)
from backend.domain.services import Service, ServiceRepository
from backend.domain.users import User
from backend.infrastructure.database import transaction
from backend.infrastructure.errors import UnprocessableError
from backend.infrastructure.models import Response, ResponseMulti

router = APIRouter(prefix="/offers", tags=["Route for managing current offer"])


@router.post("/add", status_code=status.HTTP_201_CREATED)
@transaction
async def offer_create(
    _: Request,
    schema: OfferCreateRequestBody,
    user_=Depends(RoleRequired(UserRole.EMPLOYEE)),
) -> Response[OfferPublic]:
    """Add current offer"""

    # Get the associated service from the database
    current_service: Service = await ServiceRepository().get(
        key_="id", value_=schema.service_id
    )

    # Check the validity of the offered price
    if schema.price < current_service.min_price:
        raise UnprocessableError

    # Create new offer
    offer: Offer = await OfferRepository().create(
        OfferUncommited(**schema.dict())
    )

    # Get public model of offer from Database
    offer_public = OfferPublic.from_orm(offer)

    return Response[OfferPublic](result=offer_public)


@router.get("/all", status_code=status.HTTP_200_OK)
@transaction
async def offer_all(_: Request) -> ResponseMulti[OfferPublic]:
    """Get all current offers"""

    # Get offers list from database
    offers_public: OfferPublic = OfferRepository().all()

    return ResponseMulti[OfferPublic](result=offers_public)


@router.get("/all_my", status_code=status.HTTP_200_OK)
@transaction
async def offer_all_my(
    _: Request, user: User = Depends(get_current_user)
) -> ResponseMulti[OfferPublic]:
    """Get all offers associated with current employee"""

    offers_public: OfferPublic = await OfferRepository().all_by(
        key_="id", value_=user.id
    )

    return ResponseMulti[OfferPublic](result=offers_public)


@router.put("/update", status_code=status.HTTP_202_ACCEPTED)
@transaction
async def offer_update(
    _: Request,
    offer_id: int,
    offer_kay: str,
    offer_value: str,
    user: User = Depends(get_current_user),
    # user= Depends(RoleRequired(UserRole.EMPLOYEE)),
) -> Response[OfferPublic]:
    """Update offer data"""

    # Get current employee
    employee: Employee = EmployeeRepository().get(
        key_="user_id", value_=user.id
    )

    # Get current offer
    offer: OfferPublic = OfferRepository().get(key_="id", value_=offer_id)

    if employee.id != offer.employee_id:
        raise UnprocessableError

    # Prepare data for update
    payload = {offer_kay: offer_value}

    # Update current offer
    offer_updated: Offer = await OfferRepository().update(
        key_="id",
        value_=offer_id,
        payload_=payload,
    )

    # Get public model of offer from Database
    offer_public = OfferPublic.from_orm(offer_updated)

    return Response[OfferPublic](result=offer_public)
